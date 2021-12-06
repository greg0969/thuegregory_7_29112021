const getData = async () =>
    await fetch("./data.json")
      .then((res) => res.json())
      .catch((error) => console.log("erreur"));
