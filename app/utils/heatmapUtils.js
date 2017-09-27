const degToRad = (deg) => {
    return deg * Math.PI / 180;
};

const values = (obj) => {
    const array = [];
    for (const key in obj) {
        array.push(obj[key]);
    }
    return array;
};

exports.processPoints = (firstPoint, secondPoint, thirdPoint, sessionPoints, width, height, radius) => {
    const initialPoints = [firstPoint, secondPoint, thirdPoint];
    let transformedPoints = sessionPoints.concat(initialPoints);

    /*
        * Traslate all points moving the secondPoint to (0, 0) on the plane
    */
    transformedPoints = transformedPoints.map((p) => {
        return {
            x: p.x - secondPoint.x,
            y: p.y - secondPoint.y
        };
    });

    /*
        * Get rotation angle
    */
    const y = thirdPoint.y - secondPoint.y;
    const x = thirdPoint.x - secondPoint.x;
    const angle = 2 * Math.PI - Math.atan2(y, x);

    /*
        * Rotate to make field parallel to x axis
        * https://en.wikipedia.org/wiki/Rotation_matrix
    */
    const cos = Math.cos(angle);
    const sin = Math.sin(angle);
    transformedPoints = transformedPoints.map((p) => {
        return {
            x: p.x * cos - p.y * sin,
            y: p.x * sin + p.y * cos
        };
    });

    const transformedFirstPoint = transformedPoints[transformedPoints.length - 3];
    const transformedSecondPoint = transformedPoints[transformedPoints.length - 2];
    const transformedThirdPoint = transformedPoints[transformedPoints.length - 1];
    const transformedInitialPoints = [transformedFirstPoint, transformedSecondPoint, transformedThirdPoint];

    /*
        * Fixing cases when rectangle is in any negative coordinates
    */
    const xMin = Math.min(...transformedInitialPoints.map((p) => p.x));
    const yMin = Math.min(...transformedInitialPoints.map((p) => p.y));
    transformedPoints.forEach((p) => {
        p.x -= Math.floor(xMin < 0 ? xMin : 0);
        p.y -= Math.floor(yMin < 0 ? yMin : 0);
    });

    /*
        * Adding heat parameter
    */
    const heatPoints = {};
    transformedPoints.forEach((p) => {
        const pointString = `${p.x}-${p.y}`;
        heatPoints[pointString] = {
            ...p,
            value: ((heatPoints[pointString] && heatPoints[pointString].value) || 0) + 1
        };
    });
    transformedPoints = values(heatPoints);

    /*
        * Scaling to screen
    */
    const xMax = Math.max(...transformedInitialPoints.map((p) => p.x));
    const yMax = Math.max(...transformedInitialPoints.map((p) => p.y));
    transformedPoints.forEach((p) => {
        p.x = Math.floor(p.x * (width - 3 * radius) / xMax + radius);
        p.y = Math.floor(p.y * (height - 3 * radius) / yMax + radius);
    });

    /*
        * Filtering outside points
    */
    const scaledXMax = xMax * (width - 3 * radius) / xMax + radius;
    const scaledYMax = yMax * (height - 3 * radius) / yMax + radius;
    transformedPoints = transformedPoints.filter((p) => {
        return p.x >= -radius && p.x <= scaledXMax + radius &&
        p.y >= -radius && p.y <= scaledYMax + radius;
    });

    // TODO: remove initial points
    return transformedPoints;
};
