import { dbService } from "fbase";
import { collection, addDoc } from "firebase/firestore";
import React, { useState } from "react";

function Home() {
  const [nweet, setNweet] = useState("");
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
      </form>
    </div>
  );
}
export default Home;
