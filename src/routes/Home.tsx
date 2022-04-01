import { dbService } from "fbase";
import {
  addDoc,
  collection,
  doc,
  getDocs,
  QuerySnapshot,
} from "firebase/firestore";
import { DocumentData } from "firebase/firestore";
import React, { useEffect, useState } from "react";

function Home() {
  const [nweet, setNweet] = useState("");
  const [nweets, setNweets] = useState<Array<nweetsType>>([]);

  interface nweetsType {
    data: any;
    id: string;
  }
  const getNweets = async () => {
    const querySnapshot = await getDocs(collection(dbService, "nweets"));
    querySnapshot.forEach((doc) => {
      const dbNweets = {
        data: doc.data().nweet,
        id: doc.id,
      };
      setNweets((prev) => [dbNweets, ...prev]);
    });
    const getNweetsArray = querySnapshot.docs.map((doc) => {
      return {
        key: doc.id,
        data: doc.data().nweet,
      };
    });
  };

  useEffect(() => {
    getNweets();
  }, []);
  const onSubmit = async (event: any) => {
    event.preventDefault();
    const docRdf = await addDoc(collection(dbService, "nweets"), {
      nweet,
      createAt: Date.now(),
    });
    setNweet("");
    console.log("Document written with ID :", docRdf.id);
  };
  const onChange = (event: any) => {
    setNweet(event.target.value);
  };
  return (
    <div>
      <form>
        <input
          type="text"
          placeholder="What's on your mind?"
          value={nweet}
          maxLength={120}
          onChange={onChange}
        />
        <input type="submit" value="Nweet" onClick={onSubmit} />
        <h4>
          {nweets.map((dbNweets) => {
            return <div key={dbNweets.id}>{dbNweets.data}</div>;
          })}
        </h4>
      </form>
    </div>
  );
}
export default Home;
