import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

function DirectoryView() {
  const BASE_URL = "http://localhost:4000";
  const [directoryItems, setDirectoryItems] = useState([]);
  const [progress, setProgress] = useState(0);
  const [newFilename, setNewFilename] = useState("");
  const [newDirName, setNewDirName] = useState("");
  const { "*": dirPath } = useParams();

  const [directoriesList, setDirectoriesList] = useState([])
  const [filesList, setFilesList] = useState([])

  async function getDirectoryItems() {
    const response = await fetch(`${BASE_URL}/directory/${dirPath}`);
    const data = await response.json();
    setDirectoriesList(data.directories);
    setFilesList(data.files);
  }
  useEffect(() => {
    getDirectoryItems();
  }, [dirPath]);

  async function uploadFile(e) {
    const file = e.target.files[0];
    const xhr = new XMLHttpRequest();
    xhr.open("POST", `${BASE_URL}/file/${file.name}`, true);
    // xhr.setRequestHeader("parentdirid", null)
    xhr.addEventListener("load", () => {
      console.log(xhr.response);
      getDirectoryItems();
    });
    xhr.upload.addEventListener("progress", (e) => {
      const totalProgress = (e.loaded / e.total) * 100;
      setProgress(totalProgress.toFixed(2));
    });
    xhr.send(file);
  }

  async function handleDelete(fileId) {
    const response = await fetch(`${BASE_URL}/file/${fileId}`, {
      method: "DELETE",
    });
    const data = await response.text();
    console.log(data);
    getDirectoryItems();
  }

  async function renameFile(oldFilename) {
    console.log({ oldFilename, newFilename });
    setNewFilename(oldFilename);
  }

  async function saveFilename(fileId) {
    setNewFilename(fileId);
    const response = await fetch(
      `${BASE_URL}/file/${fileId}`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ newFilename}),
      }
    );
    const data = await response.text();
    console.log(data);
    setNewFilename("");
    getDirectoryItems();
  }

  async function createNewDirectory(e) {
    e.preventDefault();
    const url = `${BASE_URL}/directory${dirPath ? `/${dirPath}` : ''}/${newDirName}`;
    const response = await fetch(url, {
      method: "POST"
    })
    const data = await response.json()
    console.log(data);
    getDirectoryItems()
  }

  return (
    <>
      <h1>My Files</h1>
      <input type="file" onChange={uploadFile} />
      <input
        type="text"
        onChange={(e) => setNewFilename(e.target.value)}
        value={newFilename}
      />
      <form onSubmit={createNewDirectory}>
        <br />
        <input type="text" value={newDirName} onChange={e => setNewDirName(e.target.value)} placeholder="Enter directory name" />
      </form>
      <p>Progress: {progress}%</p>
      {filesList.map(({ name, id }, i) => (
        <div key={i}>
          {name} {" "}
          <a href={`${BASE_URL}/file/${id}`}>
              Open
            </a>
          {" "}
            <a href={`${BASE_URL}/file/${id}?action=download`}>
              Download
            </a>
          <button onClick={() => renameFile(name)}>Rename</button>
          <button onClick={() => saveFilename(id)}>Save</button>
          <button
            onClick={() => {
              handleDelete(name);
            }}
          >
            Delete
          </button>
          <br />
        </div>
      ))}
    </>
  );
}

export default DirectoryView;
