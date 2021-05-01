var GetImportance = function (employees, id) {
  const map = employees.reduce((map, emp) => {
    map.set(id, emp);
    return map;
  }, new Map());
  const find = id => {
    const emp = map.get(id);
    return (
      emp.importance + emp.subordinates.map(id => find(id)).reduce((total, cur) => total + cur, 0)
    );
  };
  return find(id);
};
