import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from 'App';
import reportWebVitals from './reportWebVitals';
import 'assets/css/App.css';
import { BrowserRouter } from 'react-router-dom';
import { ChakraProvider } from '@chakra-ui/react';
import theme from 'theme/theme';
import { ThemeEditorProvider } from '@hypertheme-editor/chakra-ui';
import { Provider } from 'react-redux';
import store from 'store';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
	<React.StrictMode>
  		<Provider store={store}>
  			<ChakraProvider theme={theme}>
				<ThemeEditorProvider>
					<BrowserRouter>
						<App />	
					</BrowserRouter>
				</ThemeEditorProvider>
			</ChakraProvider>
  		</Provider>
	</React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
