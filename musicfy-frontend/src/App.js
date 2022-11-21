import { useState } from 'react';
import { Routes, Route } from 'react-router-dom';

import Topbar from './scenes/global/Topbar';
import Sidebar from './scenes/global/Sidebar';
import Dashboard from './scenes/dashboard';
import GetAlbums from './scenes/albums';
import CreateAlbum from './scenes/albumCreate';
import EditAlbum from './scenes/albumEdit';

import { CssBaseline, ThemeProvider } from '@mui/material';
import { ColorModeContext, useMode } from './theme';

function App() {
    const [theme, colorMode] = useMode();
    const [isSidebar, setIsSidebar] = useState(true);

    return (
        <ColorModeContext.Provider value={colorMode}>
            <ThemeProvider theme={theme}>
                <CssBaseline />
                <div className='app'>
                    <Sidebar isSidebar={isSidebar} />
                    <main className='content'>
                        <Topbar setIsSidebar={setIsSidebar} />
                        <Routes>
                            {/* Album routes */}
                            <Route path='/' element={<Dashboard />} />
                            <Route path='/album' element={<GetAlbums />} />
                            <Route path='/album/create' element={<CreateAlbum />} />
                            <Route path='/album/edit/:albumId' element={<EditAlbum />} />
                        </Routes>
                    </main>
                </div>
            </ThemeProvider>
        </ColorModeContext.Provider>
    );
}

export default App;
