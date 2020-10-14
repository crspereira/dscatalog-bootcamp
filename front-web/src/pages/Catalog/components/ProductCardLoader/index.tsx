import React from "react"
import ContentLoader from "react-content-loader"

const ProductCardLoader = () => {
  const loaderItems = [0,1,2,4,5,6,7,8,9,10,11,12];

  return (
    <>
      {loaderItems.map(item => (
        <ContentLoader 
        key={item}
        speed={1}
        width={245}
        height={340}
        viewBox="0 0 245 340"
        backgroundColor="#f3f3f3"
        foregroundColor="#ecebeb"
      >
        <rect x="0" y="0" rx="10" ry="10" width="245" height="340" />
      </ContentLoader>
      ))}
    </>
  )
}

export default ProductCardLoader