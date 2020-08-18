

let key = 0;
const createNote = () => {
    return {
        id: `id${key}`,
        title: `title${key++}`,
    };
};
const listNote = () => {
    // const note = (id, title) => ({id, title});
    return [createNote(), createNote()];
}

const listTag = () => {
    let tag = 0;
    const createTag = () => ({
        id: `${tag}`,
        name: `tagID: ${tag++}`
    })
    return [createTag(), createTag()];
}

const mockupRequest = (result) => new Promise(resolve => {
    console.log('API response:', result);
    setTimeout(() => resolve(result), 1000);
})

const noteAPI = {
    getNotes: () => {
        // get /notes
        return mockupRequest({
            result: listNote()
        })
    },
    getFavoriteNotes: () => {
        // get /notes/favoriteNotes
        return mockupRequest({
            result: listNote()
        })
    },
    getNote: (id) => {
        // get /notes/id

        console.log('load Note ', id);
        return mockupRequest({
            note: {
                id: 'id1',
                title: `Title Note ${id}`,
                content: `# content Note ${id}`,
                isFavorite: true,
                tags: listTag(),
                children: listNote(),
                children: [],
                lastEdited: Date.now(),
                isDeleted: false
            }
        });
    },
    getChildren: (id) => {
        // get /notes/id/children
        return mockupRequest({
            result: listNote()
        });
    },
    searchNote: (params) => {
        // post /search
        // body 
        //         {
        //   "query": "string",
        //   "limit": 0,
        //   "filter": {
        //     "isTitle": true,
        //     "isContent": true
        //   },
        //   "sort": "string",
        //   "tags": [
        //     "string"
        //   ]
        // }
        console.log("Search ", params);
        const data = [...Array(params.limit).keys()].map(item => createNote());

        return mockupRequest({
            result: data,
            total: 30,
        });
    },
    addNewNote: () => {
        // post /notes
        console.log('add new note');
        return mockupRequest({
            newNoteID: `id${key++}`
        });
    }
}

export default noteAPI;
