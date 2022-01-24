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