import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import AStar from "../algorithms/AStar";
import make from "../grid/grid";

const Finder = () => {
  const [patht, setPatht] = useState([]);
  const [grid] = useState(make(20, 42));
  const [search, setSearch] = useState(false);
  const [end, setEnd] = useState([0, 0]);

  const [mouseDrag, setmouseDrag] = useState(false);

  const start = (spot) => {
    if (!search && !spot.isWall) {
      let elm = document.getElementsByClassName("start")[0];
      if (elm) elm.classList.remove("start");
      document
        .getElementsByClassName(spot.i + "-" + spot.j)[0]
        .classList.add("start");
      let path = AStar(spot, end, grid);
      if (path) animateThePath(path);
    }
  };
  const endNode = (spot) => {
    if (!spot.isWall) {
      let newEnd = [spot.i, spot.j];
      setEnd(newEnd);
    }
  };
  const animateThePath = (path) => {
    // if path founded
    if (path[0].start) {
      setSearch(true);
      // remove the last path
      for (let i = 0; i < patht.length; i++) {
        document
          .getElementsByClassName(patht[i].i + "-" + patht[i].j)[0]
          .classList.remove("path");
      }
      // add the new one
      for (let i = 0; i < path.length; i++) {
        setTimeout(() => {
          document
            .getElementsByClassName(path[i].i + "-" + path[i].j)[0]
            .classList.add("path");
          if (i === path.length - 1) {
            setSearch(false);
            setPatht(path);
          }
        }, 30 * i);
      }
    } else {
      // if no path
      setSearch(true);
      // remove the last path
      for (let i = 0; i < patht.length; i++) {
        document
          .getElementsByClassName(patht[i].i + "-" + patht[i].j)[0]
          .classList.remove("path");
      }
      // highlight the uncoverd areas
      for (let i = 0; i < path.length; i++) {
        setTimeout(() => {
          // check the houses to highlight them
          path[i].neighbors.forEach((neighbor) => {
            if (neighbor.house) {
              let element = document.getElementsByClassName(
                neighbor.i + "-" + neighbor.j
              )[0].childNodes;
              element[0].classList.add("house-block");
              return;
            } else {
              if (!neighbor.isWall) {
                neighbor.neighbors.forEach((n) => {
                  if (n.house) {
                    let element = document.getElementsByClassName(
                      n.i + "-" + n.j
                    )[0].childNodes;
                    element[0].classList.add("house-block");
                    return;
                  }
                });
              }
            }
          });

          // check the areas that are not houses
          let element = document.getElementsByClassName(
            path[i].i + "-" + path[i].j
          )[0];

          if (element.classList.contains("alert")) {
            element.classList.remove("alert");
            setTimeout(() => {
              element.classList.add("alert");
            }, 10);
          } else {
            element.classList.add("alert");
          }

          if (i === path.length - 1) {
            setSearch(false);
          }
        }, 20 * i);
      }
    }
  };
  useEffect(() => {
    let rows = grid.length;
    let cols = grid[rows - 1].length;
    setEnd([rows - 1, cols - 1]);
    createHouses();
  }, [grid]);
  const createHouses = () => {
    const title = React.createElement("span", { className: "house-wall" });
    let houses = document.getElementsByClassName("house");
    for (let i = 0; i < houses.length; i++) {
      ReactDOM.render(title, document.getElementsByClassName("house")[i]);
    }
  };
  return (
    <React.Fragment>
      <div className="background"></div>

      <div className="main">
        {grid.map((cols, index) => (
          <div key={index} className="row">
            {cols.map((spot, index2) => (
              <span
                key={index2}
                onMouseUp={() => {
                  setmouseDrag(false);
                }}
                onMouseEnter={() => mouseDrag && endNode(spot)}
                onMouseDown={() =>
                  spot.i === end[0] && spot.j === end[1]
                    ? setmouseDrag(true)
                    : start(spot)
                }
                className={`node ${spot.i + "-" + spot.j + " "}${
                  spot.isWall && " wall "
                } ${spot.i === end[0] && spot.j === end[1] ? " end " : " "} ${
                  spot.start && " start "
                } ${spot.house && " house "}`}
              >
                {spot.start && <div className="plus"></div>}
              </span>
            ))}
          </div>
        ))}
      </div>
    </React.Fragment>
  );
};

export default Finder;
