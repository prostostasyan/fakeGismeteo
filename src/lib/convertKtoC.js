const convertKtoC = (T) => {
  const temp = Math.ceil((T - 273.15) * 10) / 10;
  return temp < 0 ? (
      <span>{Math.ceil((T - 273.15) * 10) / 10}&deg;</span>
  ) : (
      <span>+{Math.ceil((T - 273.15) * 10) / 10}&deg;</span>
  );
};