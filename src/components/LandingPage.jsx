import { useEffect, useState } from "react";
import { collection, addDoc, getDocs, updateDoc, doc, serverTimestamp } from "firebase/firestore";
import { db } from "../config/firebase";

export default function LandingPage() {
  const [data, setData] = useState({
    name: "",
    number: "",
    email: "",
    address: "",
    message: "",
  });

  const [entries, setEntries] = useState([]);

  const handleSetData = (term, value) => {
    setData((state) => {
      return { ...state, [term]: value };
    });
    console.log(data);
  };

  const handleSubmitData = async () => {
    try {
      // Import the functions as required
      // const docRef = await setDoc(doc(db, "contactForm", data.name), {
      //   name: data.name,
      //   number: data.number,
      //   email: data.email,
      //   address: data.address,
      //   message: data.message,
      //   timestamp: serverTimestamp();
      // },{merge:true});

      // For subCollection
      // await addDoc(collection(db, "parentCollection", "documentId", "subCollection"));
      // await setDoc(doc(db, "parentCollection", "documentId", "subCollection", "subDocumentId"));

      const docRef = await addDoc(collection(db, "contactForm"), {
        name: data.name,
        number: data.number,
        email: data.email,
        address: data.address,
        message: data.message,
        timestamp: serverTimestamp(),
      });

      console.log("Document written with ID: ", docRef.id);
    } catch (err) {
      console.log(err);
    }
  };

  const handleUpdateData = async (documentId) => {
    try {
      // // Create an initial document to update.
      // const frankDocRef = doc(db, "users", "frank");
      // await setDoc(frankDocRef, {
      //   name: "Frank",
      //   favorites: { food: "Pizza", color: "Blue", subject: "recess" },
      //   age: 12,
      // });

      // // To update age and favorite color:
      // await updateDoc(frankDocRef, {
      //   age: 13,
      //   "favorites.color": "Red",
      // });

      // ------

      // Array Operations
      // import { doc, updateDoc, arrayUnion, arrayRemove } from "firebase/firestore";

      // const washingtonRef = doc(db, "cities", "DC");

      // // Atomically add a new region to the "regions" array field.
      // await updateDoc(washingtonRef, {
      //   regions: arrayUnion("greater_virginia"),
      // });

      // // Atomically remove a region from the "regions" array field.
      // await updateDoc(washingtonRef, {
      //   regions: arrayRemove("east_coast"),
      // });

      //  ------

      // import { doc, updateDoc, increment } from "firebase/firestore";

      // const washingtonRef = doc(db, "cities", "DC");

      // // Atomically increment the population of the city by 50.
      // await updateDoc(washingtonRef, {
      //   population: increment(50),
      // });

      await updateDoc(doc(db, "contactForm", documentId), {
        name: data.name,
        number: data.number,
        email: data.email,
        address: data.address,
        message: data.message,
        timestamp: serverTimestamp(),
      });
      console.log("updated Successfully");
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    const handleGetData = async () => {
      const querySnapshot = await getDocs(collection(db, "contactForm"));

      const filteredData = querySnapshot.docs.map((entry) => ({
        ...entry.data(),
        id: entry.id,
      }));

      setEntries(filteredData);
      console.log(filteredData);
    };

    handleGetData();
  }, []);

  return (
    <>
      <h1>Welcome</h1>
      <h2>Congratulations!</h2>
      <h3>You are logged in and on the landing page!</h3>
      <h4>Now You can enter your data</h4>

      <input onChange={(e) => handleSetData("name", e.target.value)} placeholder="Name" />
      <input onChange={(e) => handleSetData("number", e.target.value)} placeholder="Number" />
      <input onChange={(e) => handleSetData("email", e.target.value)} placeholder="email" />
      <input onChange={(e) => handleSetData("address", e.target.value)} placeholder="Address" />
      <textarea onChange={(e) => handleSetData("message", e.target.value)}></textarea>
      <button onClick={handleSubmitData}>Submit</button>

      {entries.map((entry) => (
        <ul>
          <li>{entry.name}</li>
          <li>{entry.email}</li>
          <li>{entry.number}</li>
          <li>{entry.message}</li>
          <button onClick={() => handleUpdateData(entry.id)}>Update Data</button>
        </ul>
      ))}
    </>
  );
}
