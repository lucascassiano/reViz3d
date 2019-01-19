/**
 * 
 * @param {Compound Object3D -- or group} object3D 
 */
export const getBoundingBox = (object3D) => {
    var box = null;
    object3D.traverse(function (obj3D) {
        var geometry = obj3D.geometry;
        if (geometry === undefined) return;
        geometry.computeBoundingBox();
        if (box === null) {
            box = geometry.boundingBox;
        } else {
            box.union(geometry.boundingBox);
        }
    });
    return box;
}
