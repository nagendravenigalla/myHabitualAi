#!/bin/bash


# Exit immediately on error
set -e

# Detect whether output is piped or not.
[[ -t 1 ]] && piped=0 || piped=1

# Defaults

interactive=0
args=()

# }}}
# Helpers {{{

out() {
  ((quiet)) && return

  local message="$@"
  if ((piped)); then
    message=$(echo $message | sed '
      s/\\[0-9]\{3\}\[[0-9]\(;[0-9]\{2\}\)\?m//g;
      s/✖/Error:/g;
      s/✔/Success:/g;
    ')
  fi
  printf '%b\n' "$message";
}
die() { out "$@"; exit 1; } >&2
err() { out " \033[1;31m✖\033[0m  $@"; } >&2
success() { out " \033[1;32m✔\033[0m  $@"; }

# Verbose logging
log() { (($verbose)) && out "$@"; }

# Notify on function success
notify() { [[ $? == 0 ]] && success "$@" || err "$@"; }

# Escape a string
escape() { echo $@ | sed 's/\//\\\//g'; }

# Unless force is used, confirm with user
confirm() {
  (($force)) && return 0;

  read -p "$1 [y/N] " -n 1;
  [[ $REPLY =~ ^[Yy]$ ]];
}

# }}}
# Script logic -- TOUCH THIS {{{

# A list of all variables to prompt in interactive mode. These variables HAVE
# to be named exactly as the longname option definition in usage().
interactive_opts=(username password gituser gitpass buildpath)

# Print usage
usage() {
  echo -n "$(basename $0) [OPTION]... [FILE]...
UI Build/Install Script
 Options:
  -u, --username    Username for script
  -g, --gituser     Username for Git
  -s, --gitpass     Password for Git
  -b, --buildpath   Path for Build 
  -p, --password    User Password
  -i, --interactive Prompt for values
  -h, --help        Display this help and exit
"
}

# Set a trap for cleaning up in case of errors or when script exits.
rollback() {
  die
}

# Put your script here
main() {

echo $password | sudo -S apt-get install -y curl
curl -sL https://deb.nodesource.com/setup_6.x | bash -
sudo apt-get install -y nodejs
sudo npm install -g angular-cli
sudo apt install -y nginx

mkdir -p $buildpath

cd $buildpath

git clone http://$gituser:$gitpass@github.com/3LOQ/eagle-alpha.git

cd eagle-alpha

git checkout staging

cd analytics-new

sudo npm install

if grep -q colorByPoint?:boolean $buildpath/eagle-alpha/analytics-new/node_modules/@types/highcharts/index.d.ts 
then 
echo OK
else 
sudo sed -i '/interface IndividualSeriesOptions {/a colorByPoint?:boolean;' node_modules/@types/highcharts/index.d.ts 
fi

node --max_old_space_size=6144 node_modules/@angular/cli/bin/ng build --prod

sudo mv dist/ /usr/share/nginx/html/octopus-ui/

sudo mv /etc/nginx/sites-available/default /etc/nginx/sites-available/default_backup

sudo touch /etc/nginx/sites-available/default

sudo tee -a /etc/nginx/sites-available/default << EOF

server {
        listen 80 default_server;
        listen [::]:80 default_server;
  root /usr/share/nginx/html/octopus-ui/;
  index index.html index.htm index.nginx-debian.html;

        server_name _;

        location / {
  try_files $uri $uri/ /index.html;
       }
}
EOF

sudo service nginx restart

}

# }}}
# Boilerplate {{{

# Prompt the user to interactively enter desired variable values. 
prompt_options() {
  local desc=
  local val=
  for val in ${interactive_opts[@]}; do
    # Skip values which already are defined
    [[ $(eval echo "\$$val") ]] && continue

    # Parse the usage description for spefic option longname.
    desc=$(usage | awk -v val=$val '
      BEGIN {
        # Separate rows at option definitions and begin line right before
        # longname.
        RS="\n +-([a-zA-Z0-9], )|-";
        ORS=" ";
      }
      NR > 3 {
        # Check if the option longname equals the value requested and passed
        # into awk.
        if ($1 == val) {
          # Print all remaining fields, ie. the description.
          for (i=2; i <= NF; i++) print $i
        }
      }
    ')
    [[ ! "$desc" ]] && continue

    echo -n "$desc: "

    # In case this is a password field, hide the user input
    if [[ $val == "password" ]]; then
      stty -echo; read password; stty echo
      echo
    # Otherwise just read the input
    elif
      [[ $val == "gitpass" ]]; then
      stty -echo; read gitpass; stty echo
      echo
    else
      eval "read $val"
    fi
  done
}

# Iterate over options breaking -ab into -a -b when needed and --foo=bar into
# --foo bar
optstring=h
unset options
while (($#)); do
  case $1 in
    # If option is of type -ab
    -[!-]?*)
      # Loop over each character starting with the second
      for ((i=1; i < ${#1}; i++)); do
        c=${1:i:1}

        # Add current char to options
        options+=("-$c")

        # If option takes a required argument, and it's not the last char make
        # the rest of the string its argument
        if [[ $optstring = *"$c:"* && ${1:i+1} ]]; then
          options+=("${1:i+1}")
          break
        fi
      done
      ;;
    # If option is of type --foo=bar
    --?*=*) options+=("${1%%=*}" "${1#*=}") ;;
    # add --endopts for --
    --) options+=(--endopts) ;;
    # Otherwise, nothing special
    *) options+=("$1") ;;
  esac
  shift
done
set -- "${options[@]}"
unset options

# Set our rollback function for unexpected exits.
trap rollback INT TERM EXIT

# A non-destructive exit for when the script exits naturally.
safe_exit() {
  trap - INT TERM EXIT
  exit
}

validate_params()
{
#echo "inside validate_mode"
#echo $1
#echo $2
if [ $2 !='' ]; then
    echo "$2"
else
   echo "no argument for $1"
   safe_exit
fi
}
# }}}
# Main loop {{{

# Print help if no arguments were passed.
[[ $# -eq 0 ]] && set -- "--help"

# Read the options and set stuff
while [[ $1 = -?* ]]; do
#  echo $1
  case $1 in
    -h|--help) usage >&2; safe_exit ;;
    -u|--username) shift; username=$1;;
    -p|--password) shift; password=$1 ;;
    -g|--gituser) shift; gituser=$1 ;;
    -s|--gitpassword) shift; gitpass=$1 ;;
    -b|--buildpath) shift; buildpath=$1 ;;
    -i|--interactive) interactive=1 ;;
    --endopts) shift; break ;;
    *) die "invalid option: $1" ;;
  esac
  shift
done

# Store the remaining part as arguments.
args+=("$@")

# }}}
# Run it {{{

# Uncomment this line if the script requires root privileges.
# [[ $UID -ne 0 ]] && die "You need to be root to run this script"

if ((interactive)); then
  prompt_options
fi
# You should delegate your logic from the `main` function
main

# This has to be run last not to rollback changes we've made.
safe_exit

# }}}
