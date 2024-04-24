// // dateUtils.ts

// export const toISOStringLocal = (d: Date) => {
//     return new Date(d.getTime() - d.getTimezoneOffset() * 60000).toISOString().slice(0, -5);
//   }

//   export const addDays = (date: Date, days: number) => {
//       var result = new Date(date);
//       result.setDate(result.getDate() + days);
//       return result;
//   }

//   export const getVariables = (vendorIds, dateRange, orderPortalList) => {
//     return {
//       _vendor_ids: vendorIds,
//       _fromDate: dateRange?.from
//           ? toISOStringLocal(new Date(dateRange.from))
//           : toISOStringLocal(new Date(new Date().getTime() - (1000 * 60 * 60 * 24 * 7))),
//       _toDate: dateRange?.to
//           ? toISOStringLocal(new Date(addDays(new Date(dateRange.to), 1).setSeconds(-1)))
//           : toISOStringLocal(new Date(new Date().getTime() - (1000 * 60 * 60 * 24 * 1))),
//       _order_source_names: orderPortalList
//       // Other variables can be added here
//     }
//   }
