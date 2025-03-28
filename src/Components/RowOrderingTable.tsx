import {useMemo, useState} from 'react';
import {
    useMaterialReactTable,
    MRT_ColumnDef,
    MRT_Row,
    MRT_TableContainer,
} from 'material-react-table';
import {data as initData, Person} from './LoadData';
import {Typography} from "@mui/material";

const RowOrderingTable = () => {
    const columns = useMemo<MRT_ColumnDef<Person>[]>(
        //column definitions...
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

    const [data, setData] = useState(() => initData);

    const table = useMaterialReactTable({
        autoResetPageIndex: false,
        columns,
        data,
        enableRowOrdering: true,
        enableSorting: false,
        muiRowDragHandleProps: ({table}) => ({
            onDragEnd: () => {
                const {draggingRow, hoveredRow} = table.getState();
                if (hoveredRow && draggingRow) {
                    data.splice(
                        (hoveredRow as MRT_Row<Person>).index,
                        0,
                        data.splice(draggingRow.index, 1)[0],
                    );
                    setData([...data]);
                }
            },
        }),
    });
    return <MRT_TableContainer table={table}/>;
};

export default RowOrderingTable;
