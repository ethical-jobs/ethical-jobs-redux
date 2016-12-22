export const responses = [
  {
    data: {
      entities: {
        invoices: {
          1: {
            id: 1,
            service_name: "One job ad credit",
          },
          2: {
            id: 2,
            service_name: "One job ad credit",
          }
        }
      },
      result: [
        1,
        2
      ]
    }
  },
  {
    data: {
      entities: {
        invoices: {
          1: {
            id: 1,
            service_name: "Ten job ad credits",
          },
          4: {
            id: 4,
            service_name: "Six job ad credits",
          },
          5: {
            id: 5,
            service_name: "Six job ad credits",
          },
          6: {
            id: 6,
            service_name: "Six job ad credits",
          }
        }
      },
      result: [
        1,
        4,
        5,
        6
      ]
    }
  }
];

export const error = {
  message: 'There was some kind of error',
  statusCode: 500,
};