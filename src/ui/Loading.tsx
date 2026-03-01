export const Loading: React.FC<{ isLoading: boolean}> = ({isLoading}) => {
  if(isLoading)
    return (<>Loading...</>)
}