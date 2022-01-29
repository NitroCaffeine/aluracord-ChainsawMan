function GlobalStyle(){
    return (
        <style global jsx> {`
                * {
                margin:0;
                padding:0;
                box-sizing: border-box;
                }
                
                body {
                    font-family:'Monospace',Courier New;
                }
                
                html,body, #__next{
                     min-height:100vh;
                     display:flex;
                    flex:1;
                 }

                 #__next{
                     flex:1;
                 }
                 #__next>*{
                     flex:1;
                 }
                 ::-webkit-scrollbar {
                    width: 10px;               
                  }
                  
                  ::-webkit-scrollbar-track {
                    background: rgba(21,16,25,0);        
                  }
                  
                 ::-webkit-scrollbar-thumb {                 
                    background-color: rgba(11,8,13,0.5);   
                    border-radius: 10px;       
                  }
                /* ./App fit height */               
            
        `}
        </style>
        
    );
}

export default function CustomApp({ Component, pageProps }) {
    console.log('Roda em todas as páginas!');
    return (
        <>
            <GlobalStyle />
            <Component {...pageProps} />
        </>
    );
  }
