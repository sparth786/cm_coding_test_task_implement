import React, { FC } from "react";
import {makeStyles} from '@material-ui/core';

interface IFilterBoxPropsType {
    options: string[],
    selected: string[],
    selectTopicFilters: (topic: string) => void
}

const useStyles = makeStyles({
    listItem: {
        display: 'flex',
        flexDirection: 'column',
        margin: '10px 0',
    },
    filterList: {

        color: '#4b4b4b',
        fontSize: '16px',
        padding: '5px 0',
        '& input': {
            cursor: 'pointer',
        },
        '& label': {
            cursor: 'pointer',
            marginLeft: '10px',
        },
    },
})

const FilterBox:FC <IFilterBoxPropsType> = ({options, selected, selectTopicFilters}) => {

    const classes = useStyles();

    return (
        <div className={classes.listItem}>
            {options.sort().map((opt: string) => (
                <div className={classes.filterList} key={opt}>
                    <input
                        name={opt}
                        type='checkbox'
                        checked={selected.includes(opt)}
                        onChange={() => selectTopicFilters(opt)}
                    />
                    <label onClick={() => selectTopicFilters(opt)} htmlFor={opt}>{opt}</label>
                </div>
            ))}
        </div>
    );
}

export default FilterBox;
