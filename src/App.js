import Browsing from "./components/fetching/fetch-git-hub";

function App() {
  const stateData = Browsing("gaearon");

  // console.log(
  //   "%c 🇹🇼: App -> stateData.Followers ",
  //   "font-size:16px;background-color:#bfbbd6;color:black;",
  //   stateData.Followers,
  //   stateData.Followers.length
  // );
  // console.log(
  //   "%c 🐳: App -> stateData.Following ",
  //   "font-size:16px;background-color:#9c39ca;color:white;",
  //   stateData.Following,
  //   stateData.Following.length
  // );
  return (
    <div>
      <h4>{stateData.nickName}</h4>
      <img src={stateData.urlAvatar} alt="avatar" />
      <p>{stateData.description}</p>
      <p>followers: {stateData.cantFollowers}</p>
      <p>followings: {stateData.cantFollowers}</p>
      <p>public repos: {stateData.cantRepos}</p>
      <p>public gists: {stateData.cantGists}</p>
    </div>
  );
}

export default App;
