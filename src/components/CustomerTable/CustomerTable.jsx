import React, { useEffect, useState } from 'react';
import { Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, Button, Input, Select, SelectItem } from "@nextui-org/react";
import { Link } from 'react-router-dom';

export default function CustomerTable() {
  const [customers, setCustomers] = useState([]);
  const [transactions, setTransactions] = useState([]);
  const [searchCriterion, setSearchCriterion] = useState('name');
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredCustomers, setFilteredCustomers] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('/data/db.json'); // Fetching the JSON file
        const data = await response.json();
        setCustomers(data.customers); // Setting customers data
        setTransactions(data.transactions); // Setting transactions data
        setFilteredCustomers(data.customers); // Initialize filteredCustomers with all customers
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const filterCustomers = () => {
      console.log(searchCriterion);
      const filtered = customers.filter((customer) => {
        if (searchCriterion === 'name') {
          return customer.name.toLowerCase().includes(searchTerm.toLowerCase());
        } else if (searchCriterion === 'totalAmount') {
          const customerTransactions = transactions.filter(
            (transaction) => transaction.customer_id === customer.id
          );
          const totalAmount = customerTransactions.reduce(
            (acc, transaction) => acc + transaction.amount,
            0
          );
          return totalAmount.toString().includes(searchTerm);
        }
        return true;
      });
      setFilteredCustomers(filtered);
    };

    filterCustomers();
  }, [searchTerm, searchCriterion, customers, transactions]);

  return (
    <div className='w-3/4 h-full flex flex-col bg-white p-6 shadow-lg rounded-lg'>
      <div className='flex mb-4 items-center'>
        <Select
          aria-label="Search Criterion"
          placeholder="Search by"
          value={searchCriterion}
          onChange={(e) => setSearchCriterion(e.target.value)}
          defaultSelectedKeys={["name"]}
          className='w-1/4'
        >
          <SelectItem value="name" key="name">Name</SelectItem>
          <SelectItem value="totalAmount" key="totalAmount">Total Amount</SelectItem>
        </Select>
        <Input
          clearable
          underlined
          placeholder={`Search by ${searchCriterion}`}
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className='ml-4 w-3/4'
        />
      </div>
      <Table aria-label="Customer Transaction Table" className="bg-gray-50 rounded-lg shadow-md">
        <TableHeader className="bg-blue-500 text-white">
          <TableColumn>Name</TableColumn>
          <TableColumn>Total Transactions</TableColumn>
          <TableColumn>Total Amount</TableColumn>
          <TableColumn>Details</TableColumn>
        </TableHeader>
        <TableBody>
          {filteredCustomers.map((customer) => {
            const customerTransactions = transactions.filter(
              (transaction) => transaction.customer_id === customer.id
            );
            const totalTransactions = customerTransactions.length;
            const totalAmount = customerTransactions.reduce(
              (acc, transaction) => acc + transaction.amount,
              0
            );
            return (
              <TableRow key={customer.id}>
                <TableCell>{customer.name}</TableCell>
                <TableCell>{totalTransactions}</TableCell>
                <TableCell>${totalAmount}</TableCell>
                <TableCell>
                  <Button as={Link} to={`/${customer.id}`} className='bg-blue-500 text-white'>Details</Button>
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </div>
  );
}
