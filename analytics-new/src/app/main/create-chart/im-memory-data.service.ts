import { InMemoryDbService } from 'angular-in-memory-web-api';

export class InMemoryDataService implements InMemoryDbService {
  createDb() {
    const data = [
      {
        'event_id': 'IB_SMALL_FUND_TRANSFER',
        'totalUniqueCount': 100000,
        'data_to_plot': [
          {
            'count_distinct_users': 422,
            'count_users': 920,
            'timestamp': '2015-05-31'
          },
          {
            'count_distinct_users': 365,
            'count_users': 736,
            'timestamp': '2015-06-30'
          },
          {
            'count_distinct_users': 378,
            'count_users': 797,
            'timestamp': '2015-07-31'
          },
          {
            'count_distinct_users': 353,
            'count_users': 722,
            'timestamp': '2015-08-31'
          },
          {
            'count_distinct_users': 298,
            'count_users': 604,
            'timestamp': '2015-09-30'
          },
          {
            'count_distinct_users': 375,
            'count_users': 709,
            'timestamp': '2015-10-31'
          },
          {
            'count_distinct_users': 340,
            'count_users': 743,
            'timestamp': '2015-11-30'
          },
          {
            'count_distinct_users': 209,
            'count_users': 374,
            'timestamp': '2015-12-31'
          },
          {
            'count_distinct_users': 234,
            'count_users': 409,
            'timestamp': '2016-01-31'
          },
          {
            'count_distinct_users': 219,
            'count_users': 344,
            'timestamp': '2016-02-29'
          },
          {
            'count_distinct_users': 275,
            'count_users': 446,
            'timestamp': '2016-03-31'
          },
          {
            'count_distinct_users': 302,
            'count_users': 503,
            'timestamp': '2016-04-30'
          },
          {
            'count_distinct_users': 466,
            'count_users': 915,
            'timestamp': '2016-05-31'
          },
          {
            'count_distinct_users': 807,
            'count_users': 1724,
            'timestamp': '2016-06-30'
          },
          {
            'count_distinct_users': 1011,
            'count_users': 2305,
            'timestamp': '2016-07-31'
          },
          {
            'count_distinct_users': 1253,
            'count_users': 3154,
            'timestamp': '2016-08-31'
          },
          {
            'count_distinct_users': 1564,
            'count_users': 3996,
            'timestamp': '2016-09-30'
          },
          {
            'count_distinct_users': 1820,
            'count_users': 4497,
            'timestamp': '2016-10-31'
          },
          {
            'count_distinct_users': 2156,
            'count_users': 5163,
            'timestamp': '2016-11-30'
          },
          {
            'count_distinct_users': 4537,
            'count_users': 15088,
            'timestamp': '2016-12-31'
          },
          {
            'count_distinct_users': 4534,
            'count_users': 14542,
            'timestamp': '2017-01-31'
          },
          {
            'count_distinct_users': 4102,
            'count_users': 11924,
            'timestamp': '2017-02-28'
          },
          {
            'count_distinct_users': 4148,
            'count_users': 12850,
            'timestamp': '2017-03-31'
          },
          {
            'count_distinct_users': 4458,
            'count_users': 12499,
            'timestamp': '2017-04-30'
          },
          {
            'count_distinct_users': 4126,
            'count_users': 11553,
            'timestamp': '2017-05-31'
          },
          {
            'count_distinct_users': 4405,
            'count_users': 12876,
            'timestamp': '2017-06-30'
          },
          {
            'count_distinct_users': 4527,
            'count_users': 13591,
            'timestamp': '2017-07-31'
          },
          {
            'count_distinct_users': 4630,
            'count_users': 14351,
            'timestamp': '2017-08-31'
          },
          {
            'count_distinct_users': 5122,
            'count_users': 15225,
            'timestamp': '2017-09-30'
          },
          {
            'count_distinct_users': 5189,
            'count_users': 15928,
            'timestamp': '2017-10-31'
          }
        ]
      },
      {
        'event_id': 'ATM_BILLPAY',
        'totalUniqueCount': 10000,
        'data_to_plot': [
          {
            'count_distinct_users': 2781,
            'count_users': 4919,
            'timestamp': '2015-05-31'
          },
          {
            'count_distinct_users': 2706,
            'count_users': 4605,
            'timestamp': '2015-06-30'
          },
          {
            'count_distinct_users': 2931,
            'count_users': 5199,
            'timestamp': '2015-07-31'
          },
          {
            'count_distinct_users': 3068,
            'count_users': 5494,
            'timestamp': '2015-08-31'
          },
          {
            'count_distinct_users': 3071,
            'count_users': 5376,
            'timestamp': '2015-09-30'
          },
          {
            'count_distinct_users': 3199,
            'count_users': 5589,
            'timestamp': '2015-10-31'
          },
          {
            'count_distinct_users': 2871,
            'count_users': 5043,
            'timestamp': '2015-11-30'
          },
          {
            'count_distinct_users': 3064,
            'count_users': 5464,
            'timestamp': '2015-12-31'
          },
          {
            'count_distinct_users': 3258,
            'count_users': 5583,
            'timestamp': '2016-01-31'
          },
          {
            'count_distinct_users': 2962,
            'count_users': 5046,
            'timestamp': '2016-02-29'
          },
          {
            'count_distinct_users': 3166,
            'count_users': 5714,
            'timestamp': '2016-03-31'
          },
          {
            'count_distinct_users': 3007,
            'count_users': 5268,
            'timestamp': '2016-04-30'
          },
          {
            'count_distinct_users': 3137,
            'count_users': 5255,
            'timestamp': '2016-05-31'
          },
          {
            'count_distinct_users': 3061,
            'count_users': 5320,
            'timestamp': '2016-06-30'
          },
          {
            'count_distinct_users': 3347,
            'count_users': 5999,
            'timestamp': '2016-07-31'
          },
          {
            'count_distinct_users': 3006,
            'count_users': 5308,
            'timestamp': '2016-08-31'
          },
          {
            'count_distinct_users': 2983,
            'count_users': 5255,
            'timestamp': '2016-09-30'
          },
          {
            'count_distinct_users': 3083,
            'count_users': 5646,
            'timestamp': '2016-10-31'
          },
          {
            'count_distinct_users': 1791,
            'count_users': 3060,
            'timestamp': '2016-11-30'
          },
          {
            'count_distinct_users': 2164,
            'count_users': 3766,
            'timestamp': '2016-12-31'
          },
          {
            'count_distinct_users': 2472,
            'count_users': 4634,
            'timestamp': '2017-01-31'
          },
          {
            'count_distinct_users': 2110,
            'count_users': 3581,
            'timestamp': '2017-02-28'
          },
          {
            'count_distinct_users': 2430,
            'count_users': 4646,
            'timestamp': '2017-03-31'
          },
          {
            'count_distinct_users': 2221,
            'count_users': 3884,
            'timestamp': '2017-04-30'
          },
          {
            'count_distinct_users': 2027,
            'count_users': 3601,
            'timestamp': '2017-05-31'
          },
          {
            'count_distinct_users': 1995,
            'count_users': 3505,
            'timestamp': '2017-06-30'
          },
          {
            'count_distinct_users': 2113,
            'count_users': 3568,
            'timestamp': '2017-07-31'
          },
          {
            'count_distinct_users': 2233,
            'count_users': 3988,
            'timestamp': '2017-08-31'
          },
          {
            'count_distinct_users': 2103,
            'count_users': 3694,
            'timestamp': '2017-09-30'
          },
          {
            'count_distinct_users': 2108,
            'count_users': 3611,
            'timestamp': '2017-10-31'
          }
        ]
      },
      {
        'event_id': 'BRANCH_LIABILITY_PRODUCT',
        'totalUniqueCount': 98765,
        'data_to_plot': [
          {
            'count_distinct_users': 689,
            'count_users': 2734,
            'timestamp': '2015-05-31'
          },
          {
            'count_distinct_users': 577,
            'count_users': 2087,
            'timestamp': '2015-06-30'
          },
          {
            'count_distinct_users': 568,
            'count_users': 2108,
            'timestamp': '2015-07-31'
          },
          {
            'count_distinct_users': 724,
            'count_users': 3802,
            'timestamp': '2015-08-31'
          },
          {
            'count_distinct_users': 657,
            'count_users': 2354,
            'timestamp': '2015-09-30'
          },
          {
            'count_distinct_users': 630,
            'count_users': 2727,
            'timestamp': '2015-10-31'
          },
          {
            'count_distinct_users': 518,
            'count_users': 2190,
            'timestamp': '2015-11-30'
          },
          {
            'count_distinct_users': 530,
            'count_users': 1760,
            'timestamp': '2015-12-31'
          },
          {
            'count_distinct_users': 559,
            'count_users': 1840,
            'timestamp': '2016-01-31'
          },
          {
            'count_distinct_users': 396,
            'count_users': 1968,
            'timestamp': '2016-02-29'
          },
          {
            'count_distinct_users': 520,
            'count_users': 3112,
            'timestamp': '2016-03-31'
          },
          {
            'count_distinct_users': 490,
            'count_users': 1967,
            'timestamp': '2016-04-30'
          },
          {
            'count_distinct_users': 550,
            'count_users': 2565,
            'timestamp': '2016-05-31'
          },
          {
            'count_distinct_users': 592,
            'count_users': 4176,
            'timestamp': '2016-06-30'
          },
          {
            'count_distinct_users': 622,
            'count_users': 3039,
            'timestamp': '2016-07-31'
          },
          {
            'count_distinct_users': 540,
            'count_users': 4987,
            'timestamp': '2016-08-31'
          },
          {
            'count_distinct_users': 544,
            'count_users': 2721,
            'timestamp': '2016-09-30'
          },
          {
            'count_distinct_users': 542,
            'count_users': 3243,
            'timestamp': '2016-10-31'
          },
          {
            'count_distinct_users': 393,
            'count_users': 1783,
            'timestamp': '2016-11-30'
          },
          {
            'count_distinct_users': 574,
            'count_users': 2640,
            'timestamp': '2016-12-31'
          },
          {
            'count_distinct_users': 683,
            'count_users': 3185,
            'timestamp': '2017-01-31'
          },
          {
            'count_distinct_users': 542,
            'count_users': 2547,
            'timestamp': '2017-02-28'
          },
          {
            'count_distinct_users': 756,
            'count_users': 5993,
            'timestamp': '2017-03-31'
          },
          {
            'count_distinct_users': 643,
            'count_users': 2940,
            'timestamp': '2017-04-30'
          },
          {
            'count_distinct_users': 629,
            'count_users': 4371,
            'timestamp': '2017-05-31'
          },
          {
            'count_distinct_users': 635,
            'count_users': 2952,
            'timestamp': '2017-06-30'
          },
          {
            'count_distinct_users': 678,
            'count_users': 3857,
            'timestamp': '2017-07-31'
          },
          {
            'count_distinct_users': 677,
            'count_users': 3468,
            'timestamp': '2017-08-31'
          },
          {
            'count_distinct_users': 561,
            'count_users': 2274,
            'timestamp': '2017-09-30'
          },
          {
            'count_distinct_users': 658,
            'count_users': 4032,
            'timestamp': '2017-10-31'
          }
        ]
      },
      {
        'event_id': 'IB_STANDING_INS',
        'totalUniqueCount': 99765,
        'data_to_plot': [
          {
            'count_distinct_users': 2677,
            'count_users': 10457,
            'timestamp': '2015-05-31'
          },
          {
            'count_distinct_users': 2911,
            'count_users': 10752,
            'timestamp': '2015-06-30'
          },
          {
            'count_distinct_users': 3051,
            'count_users': 11146,
            'timestamp': '2015-07-31'
          },
          {
            'count_distinct_users': 2612,
            'count_users': 8450,
            'timestamp': '2015-08-31'
          },
          {
            'count_distinct_users': 2017,
            'count_users': 5346,
            'timestamp': '2015-09-30'
          },
          {
            'count_distinct_users': 2035,
            'count_users': 5449,
            'timestamp': '2015-10-31'
          },
          {
            'count_distinct_users': 2721,
            'count_users': 7074,
            'timestamp': '2015-11-30'
          },
          {
            'count_distinct_users': 1935,
            'count_users': 5143,
            'timestamp': '2015-12-31'
          },
          {
            'count_distinct_users': 2261,
            'count_users': 5866,
            'timestamp': '2016-01-31'
          },
          {
            'count_distinct_users': 1921,
            'count_users': 4929,
            'timestamp': '2016-02-29'
          },
          {
            'count_distinct_users': 2078,
            'count_users': 5379,
            'timestamp': '2016-03-31'
          },
          {
            'count_distinct_users': 2313,
            'count_users': 6346,
            'timestamp': '2016-04-30'
          },
          {
            'count_distinct_users': 2363,
            'count_users': 6514,
            'timestamp': '2016-05-31'
          },
          {
            'count_distinct_users': 2484,
            'count_users': 7044,
            'timestamp': '2016-06-30'
          },
          {
            'count_distinct_users': 2513,
            'count_users': 7023,
            'timestamp': '2016-07-31'
          },
          {
            'count_distinct_users': 2790,
            'count_users': 7621,
            'timestamp': '2016-08-31'
          },
          {
            'count_distinct_users': 3488,
            'count_users': 9538,
            'timestamp': '2016-09-30'
          },
          {
            'count_distinct_users': 2903,
            'count_users': 7833,
            'timestamp': '2016-10-31'
          },
          {
            'count_distinct_users': 2352,
            'count_users': 6021,
            'timestamp': '2016-11-30'
          },
          {
            'count_distinct_users': 2231,
            'count_users': 6231,
            'timestamp': '2016-12-31'
          },
          {
            'count_distinct_users': 2699,
            'count_users': 7491,
            'timestamp': '2017-01-31'
          },
          {
            'count_distinct_users': 2851,
            'count_users': 8022,
            'timestamp': '2017-02-28'
          },
          {
            'count_distinct_users': 3245,
            'count_users': 9997,
            'timestamp': '2017-03-31'
          },
          {
            'count_distinct_users': 3656,
            'count_users': 11084,
            'timestamp': '2017-04-30'
          },
          {
            'count_distinct_users': 3427,
            'count_users': 10126,
            'timestamp': '2017-05-31'
          },
          {
            'count_distinct_users': 3447,
            'count_users': 10380,
            'timestamp': '2017-06-30'
          },
          {
            'count_distinct_users': 3393,
            'count_users': 10551,
            'timestamp': '2017-07-31'
          },
          {
            'count_distinct_users': 3847,
            'count_users': 11713,
            'timestamp': '2017-08-31'
          },
          {
            'count_distinct_users': 4135,
            'count_users': 12989,
            'timestamp': '2017-09-30'
          },
          {
            'count_distinct_users': 4147,
            'count_users': 12707,
            'timestamp': '2017-10-31'
          }
        ]
      },
      {
        'event_id': 'BRANCH_FUND_TRANSFER_NEFT',
        'totalUniqueCount': 78765,
        'data_to_plot': [
          {
            'count_distinct_users': 507,
            'count_users': 1657,
            'timestamp': '2015-05-31'
          },
          {
            'count_distinct_users': 579,
            'count_users': 2557,
            'timestamp': '2015-06-30'
          },
          {
            'count_distinct_users': 604,
            'count_users': 2592,
            'timestamp': '2015-07-31'
          },
          {
            'count_distinct_users': 567,
            'count_users': 2375,
            'timestamp': '2015-08-31'
          },
          {
            'count_distinct_users': 573,
            'count_users': 2492,
            'timestamp': '2015-09-30'
          },
          {
            'count_distinct_users': 583,
            'count_users': 2947,
            'timestamp': '2015-10-31'
          },
          {
            'count_distinct_users': 489,
            'count_users': 2622,
            'timestamp': '2015-11-30'
          },
          {
            'count_distinct_users': 514,
            'count_users': 2187,
            'timestamp': '2015-12-31'
          },
          {
            'count_distinct_users': 560,
            'count_users': 2037,
            'timestamp': '2016-01-31'
          },
          {
            'count_distinct_users': 600,
            'count_users': 1896,
            'timestamp': '2016-02-29'
          },
          {
            'count_distinct_users': 717,
            'count_users': 2313,
            'timestamp': '2016-03-31'
          },
          {
            'count_distinct_users': 542,
            'count_users': 3197,
            'timestamp': '2016-04-30'
          },
          {
            'count_distinct_users': 723,
            'count_users': 2275,
            'timestamp': '2016-05-31'
          },
          {
            'count_distinct_users': 819,
            'count_users': 2435,
            'timestamp': '2016-06-30'
          },
          {
            'count_distinct_users': 670,
            'count_users': 2423,
            'timestamp': '2016-07-31'
          },
          {
            'count_distinct_users': 609,
            'count_users': 1759,
            'timestamp': '2016-08-31'
          },
          {
            'count_distinct_users': 728,
            'count_users': 1886,
            'timestamp': '2016-09-30'
          },
          {
            'count_distinct_users': 634,
            'count_users': 3467,
            'timestamp': '2016-10-31'
          },
          {
            'count_distinct_users': 747,
            'count_users': 1809,
            'timestamp': '2016-11-30'
          },
          {
            'count_distinct_users': 1940,
            'count_users': 6156,
            'timestamp': '2016-12-31'
          },
          {
            'count_distinct_users': 1541,
            'count_users': 6534,
            'timestamp': '2017-01-31'
          },
          {
            'count_distinct_users': 1318,
            'count_users': 6640,
            'timestamp': '2017-02-28'
          },
          {
            'count_distinct_users': 1375,
            'count_users': 5825,
            'timestamp': '2017-03-31'
          },
          {
            'count_distinct_users': 830,
            'count_users': 4800,
            'timestamp': '2017-04-30'
          },
          {
            'count_distinct_users': 957,
            'count_users': 5593,
            'timestamp': '2017-05-31'
          },
          {
            'count_distinct_users': 912,
            'count_users': 4770,
            'timestamp': '2017-06-30'
          },
          {
            'count_distinct_users': 1054,
            'count_users': 4117,
            'timestamp': '2017-07-31'
          },
          {
            'count_distinct_users': 1147,
            'count_users': 4014,
            'timestamp': '2017-08-31'
          },
          {
            'count_distinct_users': 900,
            'count_users': 3433,
            'timestamp': '2017-09-30'
          },
          {
            'count_distinct_users': 1126,
            'count_users': 4021,
            'timestamp': '2017-10-31'
          }
        ]
      }];
    return {data};
  }
}
