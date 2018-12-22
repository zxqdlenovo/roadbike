import React from "react"
import styled from "react-emotion"
import { graphql, Link } from "gatsby"
import presets, { colors } from "../../utils/presets"
import Hexagon from 'react-hexagon'
import HexagonItem from "./hexagon-item"
import {FiFeather} from "react-icons/fi"

// hexagon 布局算法取自 https://github.com/web-tiki/responsive-grid-of-hexagons
/**
To **change the number of hexagons per row**, you need to:

### Width of `.hex`
Customize the with of the `.hex` elements with:
```
w = width of the .hex elements in percent
x = the number of hexagons you want on the odd rows (1st, 3rd, 5th...)

w = 100 / x
```

Example for 8 hexagons on odd rows (this means there will be 7 hexagons on even rows):
```
w = 100 / 8 = 12.5%
```

### Indent even rows
The even rows (2nd, 4th,6th...) are indented with `margin-left` on the first hexagon of even rows.

**The selector:**  
You can select that hexagon with the `.hex:nth-child(an+b)` selector (more info on on the `nth-child()` pseudo-class on [MDN](https://developer.mozilla.org/en-US/docs/Web/CSS/:nth-child)). To determine the selector, you can use this rule:

```
.hex:nth-child(an+b)

x = the number of hexagons on odd rows(1st, 3rd, 5th...)
Y = the number of hexagons on even rows(2nd, 4th, 6th...)
a = x + y
b = x + 1
```

Example for 8 hexagons on odd rows (this means there will be 7 hexagons on even rows):
```
x = 8
y = 7
a = 8 + 7 = 15
b = 8 + 1 = 9

The selector is : .hex:nth-child(15n+9)
```

**Value of margin-left:**  
The value of margin left is **half the width of one hexagon** so for 8 hexagons on odd row :
```
with of hexagons = 12.5% (see "width of .hex")
margin-left = 12.5 / 2 = 6.25%
```
-------------

**/
const HexagonContainerStyled = styled(`div`)`
/***https://codepen.io/adamriguez/pen/eRaXeq**/
  display: flex;
  flex-wrap: wrap;
  position: absolute;
  right: 0;
  bottom: 0;
  width: 30%;
  margin: 0 auto;
  font-family: sans-serif;
  list-style-type: none;
  & .hex {
    position: relative;
    transition: all 0.5s;
    backface-visibility: hidden;
    will-change: transform;
    transition: all 0.5s;
    height: 100%;
    margin-top: -15px;
    padding-left: 5px;
    transition: transform .5s;
  }
  & .hex:hover {
    transform: scale(1.06);
    cursor: pointer;
  }
  & .hex.hex_active{
    transform: scale(2);
    z-index: 1000;
  }
  & .hex .hex_icon{
    width: 100%;
    height: 100%;
    pointer-events: none;
  }


  ${presets.Mobile} and (max-width: 549px) {
    font-size: 8px;
  }

  ${presets.Phablet} and ( max-width: 749px) { /* <- 2-1  hexagons per row */
    padding-bottom: 11.2%;
    font-size: 12px;
    & .hex {
      width: 50%; /* = 100 / 2 */
    }
    & .hex:nth-child(3n+3){ /* first hexagon of even rows */
      margin-left:25%;  /* = width of .hex / 2  to indent even rows */
    }
  }

  ${presets.Tablet} and (max-width: 999px) { /* <- 3-2  hexagons per row */
    padding-bottom: 7.4%;
    font-size: 14px;
    & .hex {
      width: 33.333%; /* = 100 / 3 */
    }
    & .hex:nth-child(5n+4){ /* first hexagon of even rows */
      margin-left:16.666%;  /* = width of .hex / 2  to indent even rows */
    }
  }

  ${presets.Desktop} { /* <- 4-3  hexagons per row */
    padding-bottom: 5.5%;
    font-size: 13px;
    & .hex {
      width: 12.5%; /* = 100 / 8 */
    }
    & .hex:nth-child(15n+9){ /* first hexagon of even rows */
      margin-left:6.25%;  /* = width of .hex / 2  to indent even rows */
    }
  }

`


const featureItems = {
  youdao: {
    type: 'store',
    title: '有道笔记',
    description: '支持有道笔记保存',
    icon: 'xxxx'
  },
  evernote: {
    type: 'store',
    title: 'evernote',
    description: '',
    icon: ''
  },
  yingxiang: {
    type: 'store',
    title: '',
    description: '',
    icon: ''
  },
  github: {
    type: 'store',
    title: '',
    description: '',
    icon: ''
  },
  gitee: {
    type: 'store',
    title: '码云',
    description: '提供了对码云笔记的支持',
    icon: ''
  },
  gitlab: {
    type: 'store',
    title: 'gitlab',
    description: '',
    icon: ''
  },
  theme: {
    type: 'basic',
    title: '多种主题',
    description: '',
    icon: ''
  },
  layout: {
    type: 'basic',
    title: '多种布局',
    description: '',
    icon: ''
  },
  preview: {
    type: 'basic',
    title: '多种预览模式',
    description: '',
    icon: ''
  },
  zen: {
    type: 'basic',
    title: '全屏写作',
    description: '',
    icon: ''
  },
  wiz: {
    type: 'store',
    title: '',
    description: '',
    icon: ''
  },
}

class FeatureHexagon extends React.Component {
  constructor(props, context) {
    super(props, context)
    this.state = {
      activeItemKey: null
    }
    this.handleActiveItem.bind(this)
  }

  handleActiveItem(itemKey){
    const oldItemKey = this.state.activeItemKey
    if (oldItemKey === itemKey) {
       this.setState({
         activeItemKey: null
       })
    } else {
       this.setState({
         activeItemKey: itemKey
       })
    }
  }

  render(){
    return (
      <HexagonContainerStyled>
        {Object.entries(featureItems).map((val, idx)=>{
          const key = val[0]
          const itemObj = val[1]
          return (
          <Hexagon className={this.state.activeItemKey === key ?"hex hex_active": "hex"} key={idx} style={{stroke: 'orange', fill: 'orange'}} onClick={()=>{this.handleActiveItem(key)}}>
            <foreignObject className="foreign-object hex_icon" x="50%" y="50%">
              <FiFeather style={{width: '50%', height: '50%', transform: 'translate(-50%, -50%)'}}/>
            </foreignObject>
          </Hexagon>
         ) 
        })}
      </HexagonContainerStyled>
    )
  }
}


export default FeatureHexagon
