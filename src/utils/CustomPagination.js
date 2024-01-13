import { MenuItem, Pagination, PaginationItem, TextField } from '@mui/material';
import React, { useState } from 'react';

const CustomPagination = ({ totalCount, dataPerPage, currentPage, handlePageChange }) => {
   const [isFresher, setIsFresher] = useState('true');

   const pageCount = Math.ceil(totalCount / dataPerPage);

   const handleChange = event => {
      setIsFresher(event.target?.value);
   };

   return (
      <div
         style={{
            width: '98%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
         }}>
         <p style={{ fontSize: '12px', fontWeight: 'bold', color: '#000000' }}>{`Showing of ${
            totalCount ? (currentPage - 1) * dataPerPage + 1 : 0
         }-${
            Number.isInteger(totalCount)
               ? currentPage === pageCount
                  ? totalCount
                  : currentPage * dataPerPage
               : 0
         } out of ${Number.isInteger(totalCount) ? totalCount : 0} entries`}</p>
         <Pagination
            disabled={!Number.isInteger(totalCount)}
            color='primary'
            count={pageCount}
            page={currentPage}
            onChange={(event, value) => {
               handlePageChange(value);
            }}
         />
      </div>
   );
};

export default CustomPagination;
