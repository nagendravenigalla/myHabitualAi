export class OctopusConfig{
  serverUrl = 'triloq.cafyne.net';

  config = {
    'dashboard': {
      /*'onboard': {
        'recommendation': 'v2/recommendation',
        'features': 'api/v2/featureMap/',
        'tasks': 'api/v2/tasks',
        'userBases': 'api/v2/userBases'
      }*/
      'port': 8017,
      'urls': {
        'chartData': '',
        'dashboardBase': ''
      }

    }
  };

  getBaseUrl(serviceVal): string{
    return 'http://' + this.serverUrl + ':' + this.config[serviceVal].port + '/';
  }

  /*getUrl(serviceVal): string{
    return this.getBaseUrl(serviceVal)'http://' + this.serverUrl + ':' + this.port + '/' + this.config[this.env].onboard[value];
  }*/
}


