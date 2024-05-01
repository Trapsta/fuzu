type Props = {
    temperature: string
}

const TempWithUnits = ({ temperature }: Props) => {
    const split = temperature.split('°');
    
    return (
      <>
        {split[0]}
        <span className="app-title">°{split[1]}</span>
      </>
    );
  };
  
  export default TempWithUnits;