import React from "react";
import { Route, Link, Switch } from "react-router-dom";
import Store from "./Store";
import "./App.css";
// import FolderListMainPage from "./FolderListMainPage/FolderListMainPage";
import FolderItems from "./FolderItems/FolderItems";
import NoteListMain from "./NoteListMain/NoteListMain";
import AddNote from "./AddNote/AddNote";
import AddFolder from "./AddFolder/AddFolder";
import Buttons from "./Buttons/Buttons";
import NoteContent from "./NoteContent/NoteContent";
import GoBackButton from "./GoBackButton/GoBackButton";

// what you need to do: NavLinks that have any dynamic params goes to the designated :params link of a route. The mapped links in FolderItems
// are all href links that you coded to have it use the folders.id in <NavLink to={`/folder/${folder.id}`}. So imagine the page now has
// all the folders listed with the href that is partly comprised of the folder.id from the state/Store. When you click onto a link, it goes to
// <Route path="/folders/:someParamName"> (this someParamName applies ANYTHING that has folders/unknownparam). So once you click on the link, you go to that
// specific route, which # of routes depends on how many folderIds there are. Once there, note that THAT specific folderID sits in (you must use "render" in Route
// not only to control what renders, but also to pass props down ) a routeProps.match.parameters.foldersId(this is whatever you named the dynamic link):dsd839048394(folder.id). This will hold a folder id for you to compare to note's folderID
// so you render the relevant note. in the render: part of the Route component/tag, you must pass this.state.notes so you can map the matching folderId and render relevant notes.
// to get back the notes, you still access the foldersId because your route still needs the folders rendered there. You are adding the notes. The prop of the notes is where you
// can control which specific data goes into the foldersId route. You need NOTES folders, which you only pass through, via a function that finds the relevant notes
// specific to the folder. The main page notes is its own ROUTE. Has NOTHING to do with the foldersId ROUTE. This one renders all notes. it's literally a page just with a compelte
// lsiut of notes. the others ones with the folder are all separate pages actually and essentially returns what's relevant to that page. Look at findNotes function to understand the rendering of NOTES MAIN.
// const child = ({ match }) => console.log(match) || <div />;

// add length state here and length state in component
export default class App extends React.Component {
  state = {
    folders: Store.folders,
    notes: Store.notes
  };

  getNotesForFolder = (notes = [], folderId) => {
    console.log("getNotesForFolder: ", notes, folderId);
    return !folderId ? notes : notes.filter(note => note.folderId === folderId);
  };

  findNote = (notes, noteId) => {
    return notes.find(note => note.id === noteId);
  };

  // place button inside card
  deleteNote = note => {
    console.log(note);
    const notes = [...this.state.notes];
    const index = this.state.notes.indexOf(note);
    if (index !== -1) {
      notes.splice(index, 1);
      this.setState({ notes: notes });
    }
  };

  renderAddButtons() {
    return (
      <div>
        <Route exact path="/" component={Buttons} />
        <Route exact path="/folder/:folderId" component={Buttons} />
      </div>
    );
  }

  setFoldersList = (name, id) => {
    this.setState({ folders: [...this.state.folders, { id: id, name: name }] });
    console.log(this.state.folders);
  };

  setNotesList = (name, content, id) => {
    this.setState({
      notes: [...this.state.notes, { name: name, content: content, id: id }]
    });
    console.log(this.state.notes);
  };

  //this below renders folder for all routes.
  renderFoldersList() {
    return (
      <>
        {["/", "/folder/:folderId"].map(path => (
          <Route
            exact
            path={path}
            key={path}
            render={routeProps => (
              <FolderItems
                folders={this.state.folders}
                notes={this.state.notes}
              />
            )}
          />
        ))}
      </>
    );
  }

  renderMainRoutes() {
    const { notes, folders } = this.state;
    return (
      <>
        {["/", "/folder/:folderId"].map(path => (
          <Route
            exact
            key={path}
            path={path}
            render={routeProps => {
              const { folderId } = routeProps.match.params;

              const notesForFolder = this.getNotesForFolder(notes, folderId);
              return (
                <NoteListMain
                  {...routeProps}
                  notes={notesForFolder}
                  deleteNote={this.deleteNote}
                />
              );
            }}
          />
        ))}
      </>
    );
  }

  render() {
    const { folders, notes } = this.state;
    return (
      <div className="App">
        <h1>
          <Link to="/" className="heading">
            Noteful
          </Link>
        </h1>

        <div className="flex">
          <nav>{this.renderFoldersList()}</nav>
          <main>{this.renderMainRoutes()}</main>
        </div>
        <div className="flex">
          <div>{this.renderAddButtons()}</div>
        </div>

        <Route
          path="/add-folder/"
          render={({ history }) => (
            <AddFolder
              setFoldersList={this.setFoldersList}
              folders={this.state.folders}
              history={history}
            />
          )}
        />
        <Route
          path="/add-note/"
          render={({ history }) => (
            <AddNote setNotesList={this.setNotesList} history={history} />
          )}
        />
        <Route
          path="/note/:noteId"
          render={routeProps => {
            const { noteId } = routeProps.match.params;
            const note = this.findNote(notes, noteId);
            return <NoteContent folders={this.state.folders} note={note} />;
          }}
        />
        <Route
          path="/note/:noteId"
          render={({ history }) => {
            return <GoBackButton history={history} />;
          }}
        />
      </div>
    );
  }
}

// renderMainRoutes renders note list for main section for each folderId path
// also notice how you can create variables on the fly and pass them down
