import html2canvas from "html2canvas";
import {useEffect, useState} from "react";
import Draggable from "react-draggable";

function App() {
    const [topText, setTopText] = useState('')
    const [botText, setBotText] = useState('')
    const [textSize, setTextSize] = useState(30)
    const [image, setImage] = useState({})
    const [color, setColor] = useState("#ffffff")

    useEffect(() => {
        fetch('https://api.imgflip.com/get_memes')
            .then(response => response.json())
            .then(response => {
                const {memes} = response.data
                setImage(memes[Math.floor(Math.random() * memes.length)])
                
            });
    }, [])

    const exportToJPEG = () => {
        if(!image.url){
            alert("erreur");
        }
        const printWrapper = document.getElementById('printWrapper')
        //html2canvas from printWrapper and download image
        html2canvas(printWrapper, {
            allowTaint: true,
            useCORS:true,
            width: image.width,
            height: image.height,
        }).then(canvas => {
            const imgData = canvas.toDataURL('image/jpeg')
            const link = document.createElement('a')
            link.download = 'meme.jpeg'
            link.href = imgData
            link.click()
        })
    }

    return (
        <div className="min-h-full flex gap-2 ">
            <div className="sidebar h-screen w-96 p-5 relative">
                <div className="grid grid-cols-1 gap-6">
                    <label className="block">
                        <span className="text-gray-700">Texte du haut</span>
                        <textarea
                            value={topText}
                            onChange={(e) => setTopText(e.target.value)}
                            className=" mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 "
                            placeholder=""/>
                    </label>
                    <label className="block">
                        <span className="text-gray-700">Texte du bas</span>
                        <textarea
                            value={botText}
                            onChange={(e) => setBotText(e.target.value)}
                            className=" mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 "
                            placeholder=""/>
                    </label>

                    <label className="block">
                        <span className="text-gray-700">Taille du texte</span>
                        <select
                            className=" mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 "
                            onChange={(e)=> setTextSize(parseInt(e.target.value))}
                        > 
                            <option value="30">30</option>
                            <option value="40">40</option>
                            <option value="50">50</option>
                            <option value="60">60</option>
                        </select>

                    </label>
                    <label className="block">
                    <span className="text-gray-700">Couleur du texte</span>
                    <input 
                        type="color"
                        className=" mt-1 block w-10 h-10 rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 "
                        onChange={(e)=> setColor(e.target.value)}
                        value={color}
                    />
                    </label>
                    
                    <div className="py-3 bg-gray-50 flex justify-between items-stretch">
                        <button type="button"
                                onClick={exportToJPEG}
                                className="flex bg-white py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                            Exporter en JPG
                        </button>
                    </div>
                </div>

                <div className="absolute flex flex-row flex-nowrap items-center justify-center bottom-10 w-96 h-[50px]">
                    <div className="flex mx-1">Powered by</div>
                    <div className="flex ">
                        <a className="text-[#F16323] hover:underline" href="#">APPRENANT IFAPME</a>
                    </div>
                </div>
            </div>

            <div className="flex flex-grow justify-center items-center bg-[#EBECF0]">
                <div id="printWrapper">

                    <img src={image.url}
                         className=" top-0 left-0 w-full h-full bg-contain bg-no-repeat bg-center relative "/>

                    <Draggable>
                        <div className="dr dlc absolute top-1/4 left-1/2">
                            <div
                                style={{fontSize: `${textSize}px`,color:`${color}`}}
                                className="text-white text-center  font-['Impact']
                                    tracking-wide whitespace-pre-line
                                    uppercase
                                    hover:cursor-move
                                    font-outline-2
                                    ">{topText}</div>
                        </div>
                       
                    </Draggable>
                    <Draggable>
                        <div className="dr dlc absolute top-3/4 left-1/2">
                            <div
                                style={{fontSize: `${textSize}px`,color:`${color}`}}
                                className="text-white text-center  font-['Impact']
                                    tracking-wide whitespace-pre-line
                                    uppercase
                                    hover:cursor-move
                                    font-outline-2
                                    ">{botText}</div>
                        </div>
                       
                    </Draggable>

 

                </div>
            </div>
        </div>
    );
}

export default App;
