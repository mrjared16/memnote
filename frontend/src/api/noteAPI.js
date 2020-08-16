let key = 0;

const createNote = () => {
    return {
        id: `id${key++}`,
        title: `title${key}`,
    };
};

const noteAPI = {
    getNote: (id) => {
        console.log('load Note ', id);
        return new Promise(resolve => {
            console.log('loading');
            setTimeout(() => {
                resolve({
                    data: {
                        id: 'id1',
                        title: 'Title',
                        content: `# abc`,
                        isFavorite: true,
                        lastEdited: Date.now(),
                        tags: [{ id: '1', name: 'tag' }, { id: '1', name: 'tag' }],
                        children: ['id1', 'id2'],
                    }
                });
                console.log('load done');
            }, 1000);
        });
    },
    getChildren: () => {
        return new Promise((resolve) => {
            const result = [createNote(), createNote()];
            setTimeout(() => {
                resolve(result);
            }, 1000);
        });
    }
}

export default noteAPI;