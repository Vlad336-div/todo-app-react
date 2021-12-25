import React from 'react';
import {useDispatch, useSelector} from "react-redux";
import {changeFilterState} from "../../redux/actions";
import translation from "../common/translation.json"

const Filters = () => {
    const dispatch = useDispatch()

    const filter = useSelector(state => state.todos.filter)
    const lang = useSelector(state => state.app.language)

    const changeFilter = (filter) => {
        dispatch(changeFilterState(filter))
    }

    return (
        <div className='filters'>
            <div
                className={`filter-btn ${filter === 'all' ? 'active-filter' : ''}`}
                onClick={() => changeFilter('all')}
            >{translation.filter.all[lang]}</div>
            <div
                className={`filter-btn ${filter === 'completed' ? 'active-filter' : ''}`}
                onClick={() => changeFilter('completed')}
            >{translation.filter.completed[lang]}</div>
            <div
                className={`filter-btn ${filter === 'not_completed' ? 'active-filter' : ''}`}
                onClick={() => changeFilter('not_completed')}
            >{translation.filter.not_completed[lang]}</div>
        </div>
    );
};

export default Filters;