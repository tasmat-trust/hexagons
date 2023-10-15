import useSWR from 'swr';
import { getCoreSubjects } from '../../queries/Subjects';

export default function WithCoreSubjects(WrappedComponent) {
  function WithCoreSubjects(props) {
    const { data: subjectsData } = useSWR([getCoreSubjects], { suspense: true });
    return (
      <>
        <WrappedComponent coreSubjects={subjectsData.subjects} {...props} />
      </>
    );
  }

  return WithCoreSubjects;
}
