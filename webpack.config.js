var webpack = require("webpack");
/*
  webpack의 역할은, entry 부터 시작하여 필요한 모듈들을 다 불러온 후, 한 파일로 합쳐 bundle.js 에 저장합니다.
  추가적으로는, 모듈을 통하여 ES6 문법으로 작성된 코드를 ES5 형태로 변환도 해줍니다.
*/

module.exports = {
    entry: './src/index.js',

    output: {
        path: __dirname + '/public/',
        //ouput으로 내놓는 파일
        filename: 'bundle.js'
    },

    devServer: {
        //hot true를 해주어야 새로고침을 하지 않고도 바뀐 내용 만을 확일 할 수 있다.
        hot: true,
        inline: true,
        host: '0.0.0.0',
        port: 4000,
        //인덱스 파일의 위치
        contentBase: __dirname + '/public/'
    },

    module: {
            loaders: [
                {
                    test: /\.js$/,
                    //새로고침을 하지 않아도 바로 적용 될 수 있도록 한다. 서버를 재시작 하지 않아도 된다.
                    loaders: ['react-hot-loader','babel-loader?' + JSON.stringify({
                          cacheDirectory: true,
                          // 다양한 로더를 설정할 수 있다.
                          presets: ['es2015', 'react']
                      })],
                    exclude: /node_modules/
                }
            ]
        },

  plugins: [
    new webpack.HotModuleReplacementPlugin()
  ]
};
