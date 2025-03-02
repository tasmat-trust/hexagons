import useSWR from 'swr';
import { getAllSnapshots } from '../../queries/Targets';

export default function WithSnapshots(WrappedComponent) {
  function WithSnapshots({...other }) {
    const { data: snapshotsData, mutate } = useSWR(getAllSnapshots, { suspense: true });
    const snapshots = snapshotsData.snapshots;
    
    // Create an object with an update method for triggerSharedState
    const refetchSnapshots = {
      update: () => {
        return mutate();
      }
    };
    
    return (
      <WrappedComponent
        {...other}
        snapshots={snapshots}
        refetchSnapshots={refetchSnapshots}
      />
    );
  }

  return WithSnapshots;
}
