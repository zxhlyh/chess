import React, { useState } from 'react';
import 'src/App.scss';
import AlertContenxtProvider from 'src/context/alert/index';
import ThemeContenxtProvider from 'src/context/theme';
import BoardContextProvider from 'src/context/board';

import ThemeSelect from 'src/components/theme-select';
import ChessBoard from 'src/components/chessboard';
import ActionSelect from 'src/components/action-select';
import ChessManual from 'src/components/chess-manual';
import Alert from 'src/components/alert';

function App() {
    const [tab, setTab] = useState(0);
    return (
        <AlertContenxtProvider>
            <ThemeContenxtProvider>
                <BoardContextProvider>
                    <div className="main-container">
                        <h4 className=''>Simple Chess Board</h4>
                        <p className=''>Made by banana with ❤️</p>
                    </div>
                    <Alert />
                    <div className="row flex-spaces tabs">
                        <input id="chessboard" type="radio" name="tabs" checked={tab === 0} />
                        <label htmlFor="chessboard" onClick={() => setTab(0)}>Chessboard</label>
                        <input id="manual" type="radio" name="tabs" checked={tab === 1} />
                        <label htmlFor="manual" onClick={() => setTab(1)}>Manual</label>
                    </div>
                    {tab === 0 ? <>
                        <div className="content">
                            <div className="paper container container-lg">
                                <div className="row">
                                    <div className="sm-8 col">
                                        <div className="main-container">
                                            <ChessBoard />
                                        </div>

                                    </div>
                                    <div className="col-fill col">
                                        <ActionSelect />
                                        <ThemeSelect />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </> : <>
                        <div className="content">
                            <div className="paper container container-lg">

                                <ChessManual />
                            </div>
                        </div>
                    </>}

                </BoardContextProvider>
            </ThemeContenxtProvider>
        </AlertContenxtProvider>
    );
}

export default App;
