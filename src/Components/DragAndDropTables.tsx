import {useMemo, useState} from 'react';
import {
    MaterialReactTable,
    MRT_ColumnDef,
    MRT_Row,
    MRT_TableOptions,
    useMaterialReactTable,
} from 'material-react-table';
import {Box, Typography} from '@mui/material';
import {data, Person} from './LoadData';
import RowOrderingTable from "./RowOrderingTable";

const DragAndDropTables = () => {
    const columns = useMemo<MRT_ColumnDef<Person>[]>(
        () => [
            {
                accessorKey: 'firstName',
                header: 'First Name',
            },
            {
                accessorKey: 'lastName',
                header: 'Last Name',
            },
            {
                accessorKey: 'city',
                header: 'City',
            },
        ],
        [],
        //end
    );

    const [data1, setData1] = useState<Person[]>(() => data.slice(0, 4));
    const [data2, setData2] = useState<Person[]>(() => data.slice(4, 8));

    const [draggingRow, setDraggingRow] = useState<MRT_Row<Person> | null>(null);
    const [hoveredTable, setHoveredTable] = useState<string | null>(null);

    const commonTableProps: Partial<MRT_TableOptions<Person>> & {
        columns: MRT_ColumnDef<Person>[];
    } = {
        columns,
        enableRowDragging: true,
        enableFullScreenToggle: false,
        muiTableContainerProps: {
            sx: {
                minHeight: '320px',
            },
        },
        onDraggingRowChange: setDraggingRow,
        state: {draggingRow},
    };

    const table1 = useMaterialReactTable({
        ...commonTableProps,
        data: data1,
        getRowId: (originalRow) => `table-1-${originalRow.firstName}`,
        muiRowDragHandleProps: {
            onDragEnd: () => {
                if (hoveredTable === 'table-2') {
                    setData2((data2) => [...data2, draggingRow!.original]);
                    setData1((data1) => data1.filter((d) => d !== draggingRow!.original));
                }
                setHoveredTable(null);
            },
        },
        muiTablePaperProps: {
            onDragEnter: () => setHoveredTable('table-1'),
            sx: {
                outline: hoveredTable === 'table-1' ? '2px dashed pink' : undefined,
            },
        },
        renderTopToolbarCustomActions: () => (
            <Typography color="success.main" component="span" variant="h4">
                Table 1 - drag&drop
            </Typography>
        ),
    });

    const table2 = useMaterialReactTable({
        ...commonTableProps,
        data: data2,
        defaultColumn: {
            size: 100,
        },
        getRowId: (originalRow) => `table-2-${originalRow.firstName}`,
        muiRowDragHandleProps: {
            onDragEnd: () => {
                if (hoveredTable === 'table-1') {
                    setData1((data1) => [...data1, draggingRow!.original]);
                    setData2((data2) => data2.filter((d) => d !== draggingRow!.original));
                }
                setHoveredTable(null);
            },
        },
        muiTablePaperProps: {
            onDragEnter: () => setHoveredTable('table-2'),
            sx: {
                outline: hoveredTable === 'table-2' ? '2px dashed pink' : undefined,
            },
        },
        renderTopToolbarCustomActions: () => (
            <Typography color="error.main" component="span" variant="h4">
                Table 2 - drag&drop
            </Typography>
        ),
    });

    return (
        <Box
            sx={{
                display: 'grid',
                gridTemplateColumns: {xs: 'auto', lg: '1fr 1fr'},
                gap: '1rem',
                overflow: 'auto',
                p: '4px',
            }}>

            <MaterialReactTable table={table1}/>
            <MaterialReactTable table={table2}/>

            <Typography color="warning" component="span" variant="h4">
                Table 3 - change Row ordering
                <RowOrderingTable/>
            </Typography>
        </Box>
    );
};

export default DragAndDropTables;
