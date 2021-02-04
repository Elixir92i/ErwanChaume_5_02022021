class Camera {
    constructor(datas) {
        this.id = datas._id;
        this.description = datas.description;
        this.imageUrl = datas.imageUrl;
        this.name = datas.name;
        this.price = datas.price;
        this.lenses = datas.lenses;
    }

    toHtml() {
        return `
<div>
    <h2>${this.name}</h2>
    <img src="${this.imageUrl}">
</div>
`
    }
}