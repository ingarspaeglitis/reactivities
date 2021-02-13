import React, { useEffect, useState } from 'react';
import { Grid } from 'semantic-ui-react';
import  ActivityList from '../dashboard/ActivityList';
import { observer } from 'mobx-react-lite';
import  LoadingComponent from '../../../app/layout/LoadingComponent';
import { useStore } from '../../../app/stores/store';
import ActivityFilters from './ActivityFilters';

const ActivityDashboard: React.FC = () => {
    
    const { activityStore } = useStore();
    const { loadActivities, activityRegistry } = activityStore;
    const [loadingNext, setLoadingNext] = useState(false);

	useEffect(() => {
        if (activityRegistry.size <= 1) loadActivities();
	},  [activityRegistry.size, loadActivities]);


	if (activityStore.loadingInitial) return <LoadingComponent content='Loading activities...' />

    return (
        <Grid>
            <Grid.Column width={ 10 }>
                <ActivityList />               
            </Grid.Column>
            <Grid.Column width={ 6 }>
               <ActivityFilters/>
            </Grid.Column>
        </Grid>
    )
}

export default observer(ActivityDashboard); 