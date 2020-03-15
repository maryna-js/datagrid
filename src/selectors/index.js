import { createSelector } from "reselect";

    import get from "lodash/get";

    import orderBy from "lodash/orderBy";

    import moment from "moment";



    const employeeSelector = state => state.app && state.app.employeeList;

    export const sortSelector = state => state.app && state.app.sortParams;



    function orderByType(data, type) {
        switch (type) {
          case "date":
            return Date.parse(data);
          case "float":
            return parseFloat(data);
          default:
            return data;
        }
      }



    export const getSortedEmployeeCollection = createSelector(

      employeeSelector,

      sortSelector,

      (employeeCollection, sort) => {

        if (sort) {

          return orderBy(

            employeeCollection,

            c => orderByType(get(c, sort.key), sort.type),

            [sort.order || "desc"]

          );

        }

        return employeeCollection;

      }

    );
