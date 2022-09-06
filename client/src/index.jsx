import React from 'react';
import ReactDOM from 'react-dom';
import "./index.css"
import ActionCable from 'actioncable';
import App from './App';
import {ReactQueryDevtools} from "react-query/devtools"
import { QueryClient, QueryClientProvider,  } from 'react-query'
import { BrowserRouter } from 'react-router-dom';
const queryClient = new QueryClient()
const cable = ActionCable.createConsumer("ws://localhost:3000/cable")
//Pass cable down to component that needs it
ReactDOM.render(
    <BrowserRouter>
    <QueryClientProvider client={queryClient}>
      <App />
      <ReactQueryDevtools initialIsOpen={false}/>
    </QueryClientProvider>
  </BrowserRouter>
  ,document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();
