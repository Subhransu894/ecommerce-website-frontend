# MyShopping App

A full-stack e-commerce app where you can browse , search, add, delete, edit, save and view detailed product.
Built with React frontend, Express/Node backend and MongoDB database.

---

## Demo Link

[Live Demo](https://ecommerce-website-frontend-5wli.vercel.app/)

---
## Quick Start

```
git clone https://github.com/Subhransu894/ecommerce-website-frontend.git
cd <your-repo>
npm install
npm run dev
```

---

## Technologies
- React Js
- React Router
- Express 
- Node Js
- MongoDB

---

## Demo Video
Watch a walkthrough (5-8 minutes) of all the major features of this app:
[Loom Video](https://drive.google.com/file/d/1Mc4GsydQwpZOKrjqU42v2Lqbn9EcVlqw/view?usp=sharing)

---

## Features
**Home**
- Display all the categories and the collections of the products.
- Search product either by tittle or description.
- Add to cart and wishlist are there to show your favourite products as you choose to buy.

**Category**
- Display the selected category products with price filteration and also price range selection to choose your products.
- Products with add to cart and add to wishlist button functionality.

**Product Details**
- It allows you to get inforamtion(description,price,quantity,size) about one particular product.
- Add to wishlist icon to add the product if you like it.

**Wishlist**
- Display all the product which are selected to be in the wishlist.
- It has the information(description) with move to cart and delete button.

**Cart**
- Display all the items selected by you, also a delivery address to deliver the product.
- Price details sections is there.
- It has the information (img,description) with a remove button to remove from the cart.

**Address**
- Here it has all the existing address as set by you.
- Add new address button for adding a new address.
- To choose any one address there is select button with edit and delete button options are also there.

**User Profile**
- Display the user details(name,email,phone number) with manage order and order history button.
- In order history you have the data of all your products till date.

---

## API Reference

### **GET /api/products**<br>
List all the products<br>
Sample Response:<br>
```
{[products:{_id,category,img,details},....]}
```

### **GET /api/products/:productId**<br>
Get details of one product<br>
Sample Response:<br>
```
{product:{_id,category,img,details,....}}
```

### **POST /api/products**<br>
Create a new product<br>
Sample Response:<br>
```
{_id,category,img,details,....}
```

### **GET /api/category**<br>
Get details of all the category<br>
Sample Response:<br>
```
{findCategory:{accessories,men,women,children}}
```

### **GET /api/orders**<br>
Get details of all orders<br>
Sample Response:<br>
```
[{addres:{fulladdress,picode},_id,userId.....}]
```

### **POST /api/orders**<br>
Create a new order<br>
Sample Response:<br>
```
{order:{_id,category,img,details,....}}
```

### **GET /api/users**<br>
Get details of all users<br>
Sample Response:<br>
```
[{_id,name,email},....]
```

### **POST /api/users**<br>
Create a new user<br>
Sample Response:<br>
```
{_id,name,email,....}
```

---

## Contact
For bugs or features request, please reach out to subhransusekhar790@gmail.com