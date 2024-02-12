import React from 'react';
import { Card, Title, Table, TableHead, TableRow, TableHeaderCell, TableBody, TableCell, Text, Badge, Button, Tab } from '@tremor/react';

import { gql, useMutation, useQuery } from "@apollo/client";
import Spinner from '../dashboard-helpers/spinner';
import SuccessMsg from '../dashboard-helpers/successMsg';

import { auth } from "@/firebase/config"
import { User, onAuthStateChanged } from 'firebase/auth';


interface Vendor {
  vendor_id: string;
  vendor_name: string;
  vendor_region: string;
}

interface GetVendorListResponse {
  api_partner_dashboard_api_pd_food_order_items: Vendor[];
}

const getVendorList = gql`
  query getVendorList {
    api_partner_dashboard_api_pd_food_order_items(distinct_on: vendor_name, order_by: {vendor_name: asc}) {
      vendor_id
      vendor_name
      vendor_region
    }
  }
`;

interface getAssignedVendorsResponse {
  vendors_of_user: VendorOfUser[];
}

interface VendorOfUser {
  vendor_id: string;
  user_id: string;
}

const getAssignedVendors = gql`
  query getVendorList($_userID: String) {
    vendors_of_user(where: {user_id: {_eq: $_userID}}) {
      vendor_id
      user_id
    }
  }
`;

const addVendorToUser = gql`
  mutation addVendorToUser($_userID: String, $_vendorID: String) {
    insert_vendors_of_user(objects: {user_id: $_userID, vendor_id: $_vendorID}) {
      affected_rows
    }
  }
`;

const removeVendorFromUser = gql`
  mutation setVendorForUser($_userID: String, $_vendorID: String) {
  delete_vendors_of_user(where: {_and: {user_id: {_eq: $_userID}, vendor_id: {_eq: $_vendorID}}}) {
    affected_rows
  }
}
`;

interface AdminEditUserProps {
  userID: string;
}


const AdminEditUser = (componentPops: AdminEditUserProps) => {
  // const [user, setUser] = React.useState<User | null>(null);

  // onAuthStateChanged(auth, (user) => {
  //   if (user) {
  //     // User is signed in, see docs for a list of available properties
  //     // https://firebase.google.com/docs/reference/js/firebase.User
  //     setUser(user)
  //   } else {
  //     // User is signed out
  //     // ...
  //     console.log("local: nope nobody is signed in");
  //   }
  // });
  // console.log("AUTHHH", user?.uid)

  const [addTodo, { data, loading, error }] = useMutation(addVendorToUser);
  const [removeTodo, { data: dataRemove, loading: loadingRemove, error: errorRemove }] = useMutation(removeVendorFromUser);

  const clickhandler = (e: any) => {
    // console.log(e.target.checked)
    // console.log(e.target.id)
    
    // console.log("user", componentPops.userID)



    // send update to server
    // if successful trigger success msg

    if(e.target.checked) {
      console.log("add")
      addTodo({ variables: { 
        _userID: componentPops.userID,
        _vendorID: e.target.id
        } 
      });
    } else {
      // remove from user
      console.log("remove")
      removeTodo({ variables: { 
        _userID: componentPops.userID,
        _vendorID: e.target.id
        } 
      });
    }
      // no vars

 }

  let { loading: loadingVendorList, error: errorVendorList, data: dataVendorList } = useQuery<GetVendorListResponse>(getVendorList, {
    // no vars
  });




  let { loading: loadingAssigned, error: errorAssigned, data: dataAssigned } = useQuery<getAssignedVendorsResponse>(getAssignedVendors, {
    variables: {
      _userID: componentPops.userID
    }
  });



  if (loadingVendorList) return (
    <Card>
      <Text>Vendor Liste</Text>
      <br></br>
      <br></br>
      <Spinner />
      <br></br>
      <br></br>
    </Card>
  )
  

  let isAssignedList: { [vendor_id: string]: boolean } = {};
    if (dataAssigned?.vendors_of_user && dataVendorList?.api_partner_dashboard_api_pd_food_order_items) {
      for (let vendor of dataVendorList?.api_partner_dashboard_api_pd_food_order_items) {
        let isAssigned = false
        if(dataAssigned?.vendors_of_user?.find(v => v.vendor_id == vendor.vendor_id)) {
          isAssigned = true
        }
        isAssignedList[vendor.vendor_id] = isAssigned
      }
    }


  return (
    
  <Card>
    <Title>Vendor Liste</Title>
    <Table className="mt-5">
      <TableHead>
        <TableRow>
          <TableHeaderCell>Vendor Name</TableHeaderCell>
          <TableHeaderCell>Vendor ID</TableHeaderCell>
          <TableHeaderCell>Region</TableHeaderCell>
          <TableHeaderCell>Active</TableHeaderCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {dataVendorList?.api_partner_dashboard_api_pd_food_order_items?.map((vendor) => (
          <TableRow key={vendor.vendor_id}>
            <TableCell>{vendor.vendor_name}</TableCell>
            <TableCell>
              <Text>{vendor.vendor_id}</Text>
            </TableCell>
            <TableCell>
              <Text>{vendor.vendor_region}</Text>
            </TableCell>
            <TableCell>
              {/* <input type="checkbox" className="appearance-none checked:bg-blue-500" /> */}

              <input id={vendor.vendor_id} type="checkbox" onClick={clickhandler} defaultChecked={isAssignedList[vendor.vendor_id]} />
       
              
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  </Card>
  )

}

export default AdminEditUser;
