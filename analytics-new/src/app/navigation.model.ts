export class NavigationModel
{
    public model: any[];

    constructor()
    {
        this.model = [
            /*{
                'id'      : 'applications',
                'title'   : 'Applications',
                'type'    : 'group',
                'children': [*/
                    {
                        'id'   : 'datasource',
                        'title': 'Data Source',
                        'type' : 'item',
                        'icon' : 'sd_storage',
                        'url'  : '/datasource'

                    },
                    {
                        'id'   : 'Taxonomy',
                        'title': 'Taxonomy',
                        'type' : 'item',
                        'icon' : 'sd_storage',
                        'url'  : '/taxonomy'

                    },
                    {
                        'id'   : 'dashboard',
                        'title': 'Segments',
                        'type' : 'item',
                        'icon' : 'email',
                        'url'  : '/segments'

                    },

                    {
                      'id'   : 'campaigns',
                      'title': 'Recommendations',
                      'type' : 'item',
                      'icon' : 'sd_storage',
                      'url'  : '/campaigns'
                    }

                /*]
            }*/
        ];
    }
}
