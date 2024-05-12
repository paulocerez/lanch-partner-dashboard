import React from "react";
import {
  Card,
  Title,
  Table,
  TableHead,
  TableRow,
  TableHeaderCell,
  TableBody,
  TableCell,
  Text,
  Badge,
  Button,
} from "@tremor/react";
import { StatusOnlineIcon } from "@heroicons/react/outline";

import { gql, useQuery } from "@apollo/client";
import Spinner from "../dashboard-helpers/Loading/Spinner";

import { useRouter } from "next/navigation";

interface User {
  id: number;
  email: string;
  is_active: boolean;
  is_admin: boolean;
  last_seen: string;
  name?: string;
  user_id_firebase: string;
}

interface GetUsersResponse {
  user: User[];
}

const getUsersResponse = gql`
  query getUsers {
    user(distinct_on: user_id_firebase) {
      id
      email
      is_active
      is_admin
      last_seen
      name
      user_id_firebase
    }
  }
`;

const AdminUserList = () => {
  const router = useRouter();

  // console.log(getTotalGMVQuery)
  const { loading, error, data } = useQuery<GetUsersResponse>(
    getUsersResponse,
    {
      // no vars
    }
  );
  // console.log(getTotalGMVresponse?.data?.api_partner_dashboard_api_pd_food_orders_aggregate)
  //console.log(data?.api_partner_dashboard_api_pd_food_orders_daily)
  // console.log()

  //console.log(JSON.stringify(data?.user))

  if (loading)
    return (
      <Card>
        <Text>Umsatz</Text>
        <br></br>
        <br></br>
        <Spinner />
        <br></br>
        <br></br>
      </Card>
    );

  return (
    <Card>
      <Title>User List</Title>
      <Table className="mt-5">
        <TableHead>
          <TableRow>
            <TableHeaderCell>Email</TableHeaderCell>
            <TableHeaderCell>Name</TableHeaderCell>
            <TableHeaderCell>UserId</TableHeaderCell>
            <TableHeaderCell>Admin</TableHeaderCell>
            <TableHeaderCell>Active</TableHeaderCell>
            <TableHeaderCell>Last Seen</TableHeaderCell>
            <TableHeaderCell>Actions</TableHeaderCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data?.user?.map((item) => (
            <TableRow key={item.id}>
              <TableCell>{item.email}</TableCell>
              <TableCell>
                <Text>{item?.name}</Text>
              </TableCell>
              <TableCell>
                <Text>{item?.user_id_firebase}</Text>
              </TableCell>
              <TableCell>
                <Text>{item.is_admin ? "yes" : "no"}</Text>
              </TableCell>
              <TableCell>
                <Text>{item?.is_active ? "yes" : "no"}</Text>
              </TableCell>
              <TableCell>
                <Text>{item?.last_seen}</Text>
              </TableCell>
              <TableCell>
                <Button
                  className="flex items-center"
                  variant="secondary"
                  onClick={() => {
                    router.push(`/admin/${item.user_id_firebase}`);
                  }}
                >
                  {" "}
                  Edit Vendors
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Card>
  );
};

export default AdminUserList;
