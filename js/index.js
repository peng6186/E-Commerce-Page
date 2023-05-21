
// After all dom and related resources are loaded
window.onload = function () {

    // get img list
    const imgList = goodData.imagessrc;
    let bigImgIdx = 0;
    // load pathNav
    loadPathNav();
    function loadPathNav() {
        // 1. get Element
        let pathNav = document.querySelector("#pathNav");
        // console.log(pathNav);

        // 2. get data
        let pathData = goodData.path;
        // console.log(pathData);

        // 3. iterate over data
        for (let i = 0; i < pathData.length; i++) {
            if (i === pathData.length - 1) {
                // create 'a' with 'href' attribute
                let aNode = document.createElement('a');
                aNode.innerText = pathData[i].title;
                pathNav.appendChild(aNode);

            } else {
                // create 'a' and 'i' nodes
                let aNode = document.createElement('a');
                aNode.href = pathData[i].url;
                aNode.innerText = pathData[i].title;

                let iNode = document.createElement('i');
                iNode.innerText = '/';

                // append nodes
                pathNav.appendChild(aNode);
                pathNav.appendChild(iNode);
            }
        }
    }

    // add event to magnifier
    magnifier();
    function magnifier() {
        // get elements
        let smallPic = document.querySelector("#smallPic");
        let leftTop = document.querySelector("#leftTop");

        smallPic.onmouseenter = function() {
            // create magnifier and big frame, and append them
            let mag = document.createElement("div");
            mag.id = "mask";

            let bigFrame = document.createElement("div");
            bigFrame.id = "bigPic";
            let bigPic = document.createElement("img");
            bigPic.src = imgList[bigImgIdx].b;
            bigFrame.appendChild(bigPic);

            smallPic.appendChild(mag);
            leftTop.appendChild(bigFrame);

            // set movement
            smallPic.onmousemove = function(event) {
                // console.log("mouse move");
                let left = event.clientX - smallPic.getBoundingClientRect().left - mag.offsetWidth / 2;
                let top = event.clientY - smallPic.getBoundingClientRect().top - mag.offsetHeight / 2;

                // restrain the mag's movement only vailid within smallPic's range
                if (left < 0) {
                    left = 0;
                } else if (left > smallPic.clientWidth - mag.offsetWidth) {
                    left = smallPic.clientWidth - mag.offsetWidth;
                }

                if (top < 0) {
                    top = 0;
                } else if (top > smallPic.clientHeight - mag.offsetHeight) {
                    top = smallPic.clientHeight - mag.offsetHeight;
                }

                mag.style.left = left + "px";
                mag.style.top = top + "px";

                // scale the big img in big frame
                let scale = (smallPic.clientWidth - mag.offsetWidth) / (bigPic.offsetWidth - bigFrame.clientWidth)
                // console.log(scale);

                bigPic.style.left = - left / scale + "px";
                bigPic.style.top = - top / scale + "px";

            }

            smallPic.onmouseleave = function() {
                smallPic.removeChild(mag);
                leftTop.removeChild(bigFrame);
            }
        }
    }

    // thumbnailData
    thumbnailData();
    function thumbnailData() {
        //1. get ul 
        let ul = document.querySelector("#wrapper #content .contentMain #center #left #leftBottom #picList ul");
        //2. get thumbnail data
        let thumbnails = goodData.imagessrc;
        // console.log(thumbnails);
        thumbnails.forEach( (val)=> {
            let newLi = document.createElement("li");

            let newImg = document.createElement("img");
            newImg.src = val.s;

            newLi.appendChild(newImg);

            ul.appendChild(newLi);
        })
    }
    
    //  thumbnailClick
    thumbnailClick();
    function thumbnailClick() {
        
        let smallImg = document.querySelector("#wrapper #content .contentMain #center #left #leftTop #smallPic img");
        smallImg.src = imgList[0].s;
        // 1. get li nodeList
        let lis = document.querySelectorAll("#wrapper #content .contentMain #center #left #leftBottom #picList ul li");
        lis.forEach((v, i, arr) => {
            v.addEventListener("click", () => {
                smallImg.src = imgList[i].s;
                bigImgIdx = i;
            })
        })
    }

    // thumbnailrolling
    thumbnailrolling();
    function thumbnailrolling() {
        const leftBtn = document.querySelector(".leftarrow");
        const rightBtn = document.querySelector(".rightarrow");
        const ul = document.querySelector("#wrapper #content .contentMain #center #left #leftBottom #picList ul");
        const lis = document.querySelectorAll("#wrapper #content .contentMain #center #left #leftBottom #picList ul li");
        
        let current = 0;
        const step = (lis[0].offsetWidth + 20) * 2;
        const endLimit = (lis.length - 5) * (lis[0].offsetWidth + 20);

        leftBtn.addEventListener("click", function() {
            current -= step;
            if (current < 0) {
                current = 0;
            }
            // console.log(current); 
            ul.style.left = -current + "px";
        });

        rightBtn.addEventListener("click", function() {
            current += step;
            if (current > endLimit) {
                current = endLimit;
            }
            // console.log(current); 
            ul.style.left = -current + "px";

        });
    }

    // goodsDetailRender
    goodsDetailRender();
    function goodsDetailRender() {
        // get element
        const rightTop = document.querySelector(".rightTop");
        const goodsDetail = goodData.goodsDetail;

        let s = `
        <div class="rightTop">
                            <h3>${goodsDetail.title}</h3>
                            <p>${goodsDetail.recommend}</p>

                            <div class="priceWrapper">
                                <div class="priceTop">
                                    <span>价&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;格</span>
                                    <div class="price">
                                        <span>￥</span>
                                        <p>${goodsDetail.price}</p>
                                        <i>降价通知</i>
                                    </div>
                                    <p>
                                        <span>累计评价</span>
                                        <span>670000</span>
                                    </p>
                                </div>

                                <div class="priceBottom">
                                    <span>促&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;销</span>
                                    <p>
                                        <span>${goodsDetail.promoteSales.type}</span>
                                        <span>${goodsDetail.promoteSales.content}</span>
                                    </p>
                                </div>
                            </div>

                            <div class="support">
                                <span>支&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;持</span>
                                <p>${goodsDetail.support}</p>
                            </div>

                            <div class="address">
                                <span>配&nbsp;送&nbsp;至</span>
                                <p>${goodsDetail.address}</p>
                            </div> 
        `;
        // render data
        rightTop.innerHTML = s;
    }

    // goodsSelectionRender
    goodsSelectionRender();
    function goodsSelectionRender() {
        // get element 
        const chooseWrapper = document.querySelector(".chooseWrapper");
        
        // get data
        const crumbData = goodData.goodsDetail.crumbData;
        // render
        crumbData.forEach((ele) => {
           
            const dl = document.createElement("dl");
            const dt = document.createElement("dt");
            dt.innerText = ele.title;
            dl.appendChild(dt);
            ele.data.forEach((val) => {
                const dd = document.createElement("dd");
                dd.innerText = val.type;
                dd.setAttribute("priceChange", val.changePrice);
                dl.appendChild(dd);
            })

            chooseWrapper.appendChild(dl);
        });

        
    }

    goodsSelectionExclusive();
    function goodsSelectionExclusive() {

        const displayPanel = document.querySelector("#wrapper #content .contentMain #center #right .rightBottom .showSelection");
        const dls = document.querySelectorAll("#wrapper #content .contentMain #center #right .rightBottom .chooseWrapper dl");
        const showArr = new Array(dls.length);
        showArr.fill(0);

        dls.forEach( (dl, dlIdx) => {
            dds = dl.querySelectorAll("dd");
            dds.forEach((dd, idx, dds) => {

                dd.addEventListener("click", function(){
                    // remove all style
                    dds.forEach( (dd)=> {
                        dd.style.color = '#666';
                    })
                    // add style to the current element
                    this.style.color = "red";

                    // add markDiv to the showArr
                    showArr[dlIdx] = this;
                    priceChangeBind(showArr);

                    // scan showArr and render non-zero items
                    displayPanel.innerHTML = ""; 
                    showArr.forEach( (val, index) => {
                        if (val) {
                            const mark = document.createElement("div");
                            mark.id = "mark";
                            mark.innerText = val.innerText;
                            const close = document.createElement("a");
                            close.innerText = "X"; 
      
                            // add event listener for "X"
                            close.addEventListener("click", function() {
                                // clean show array
                                showArr[index]  = 0;
                                priceChangeBind(showArr);
                                // remove the current Node from displayPanel
                                displayPanel.removeChild(this.parentNode);
                                // reset the default selection (i.e. first dd)
                                const ddNodes = dls[index].querySelectorAll("dd");
                                ddNodes.forEach( (dd) => {
                                    dd.style.color = "#666";
                                })
                                ddNodes[0].style.color = "red";
                            });


                            mark.appendChild(close);
                            displayPanel.appendChild(mark);
                        }
                    });



                })
            })
        });
    }

    function priceChangeBind(showArr) {

        const priceDisplay = document.querySelector("#wrapper #content .contentMain #center #right .rightTop .priceWrapper .priceTop .price > p");
        let initialPrice= goodData.goodsDetail.price;
        for (let i = 0; i < showArr.length; i++) {
            if (showArr[i]) {
                initialPrice += +showArr[i].getAttribute('pricechange');
            }
        }
 
        priceDisplay.innerText = initialPrice;
       
        // sync the leftPrice to priceDisplay
        let leftPrice = document.querySelector("#wrapper #content .contentMain .bottom .rightBottom .chooseBox .chooseDisplay .left p");
        leftPrice.innerText = "¥" + priceDisplay.innerText;
        // update the rightPrice based on leftPrice and accessories selected
        const accessories = document.querySelectorAll("#wrapper #content .contentMain .bottom .rightBottom .chooseBox .chooseDisplay .middle ul li input");
        let rightPrice = document.querySelector("#wrapper #content .contentMain .bottom .rightBottom .chooseBox .chooseDisplay .right i");

        accessories.forEach((val) => {
            if (val.checked) {
                initialPrice += +val.value;
            }
        });
        rightPrice.innerText = "¥" + initialPrice;

    }

    accessory();
    function accessory() {
        const accessories = document.querySelectorAll("#wrapper #content .contentMain .bottom .rightBottom .chooseBox .chooseDisplay .middle ul li input");
        let leftPrice = document.querySelector("#wrapper #content .contentMain .bottom .rightBottom .chooseBox .chooseDisplay .left p");
        let rightPrice = document.querySelector("#wrapper #content .contentMain .bottom .rightBottom .chooseBox .chooseDisplay .right i");

        accessories.forEach((val) => {
            val.addEventListener("click", function() {
                let currentPrice = +leftPrice.innerText.slice(1);
                for (let i = 0; i < accessories.length; i++) {
                    if (accessories[i].checked) {
                        currentPrice += +accessories[i].value;
                    }
                }
                rightPrice.innerText = "¥" + currentPrice;
            })
        })
    }

    // switch tabs
    function switchTabs(tabBtns, tabContent) {
        tabBtns.forEach((tab, tabIdx)=> {
            tab.addEventListener("click", function() {
                // remove all active className from all tabBtns and tabContent
                for (let i = 0; i < tabBtns.length; i++) {
                    tabBtns[i].className = "";
                    tabContent[i].className = "";
                }
                // add active className to the current tabBtn and corresponding tabContent
                this.className = "active";
                tabContent[tabIdx].className = "active"; 
            });
        });
    }

    activateSwitchTabs();
    function activateSwitchTabs() {
        // leftSide tabs
        const leftTabs = document.querySelectorAll("#wrapper #content .contentMain .bottom .leftAside .asideTop h4");
        // console.log(leftTabs);
        const leftContent =  document.querySelectorAll("#wrapper #content .contentMain .bottom .leftAside .asideContent>div");
        switchTabs(leftTabs, leftContent);

        // // rightBottom tabs
        const rightTabs = document.querySelectorAll("#wrapper #content .contentMain .bottom .rightBottom .bottomBox .tabs li");
        const rightContent =  document.querySelectorAll("#wrapper #content .contentMain .bottom .rightBottom .bottomBox .bottomContent>div");
        switchTabs(rightTabs, rightContent);
    }

    // asideBtnBind
    asideBtnBind();
    function asideBtnBind() {
        let isClose = true;
        const btn = document.querySelector("#wrapper .rightAside .btns");
        const asideContent = document.querySelector("#wrapper .rightAside");

        btn.addEventListener("click", function() {
            if (isClose) {
                btn.classList.remove("btnClose");
                asideContent.classList.remove("asideClose");
                btn.classList.add("btnOpen");
                asideContent.classList.add("asideOpen");

            } else {
                btn.classList.remove("btnOpen");
                asideContent.classList.remove("asideOpen");
                btn.classList.add("btnClose");
                asideContent.classList.add("asideClose");
            }

            isClose = !isClose;
        })
    }
}