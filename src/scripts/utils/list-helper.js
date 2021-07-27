const extractStringFromList = (arrayObject) => {
  const listString = [];
  arrayObject.forEach((element) => {
    listString.push(element.name);
  });
  return listString;
};

export default extractStringFromList;
