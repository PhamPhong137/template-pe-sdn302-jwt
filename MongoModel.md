
# MongoDB Model Creation Examples

## 1. Single-Level Model
   - **Description**: A basic model with simple fields, similar to a flat structure.
   - **Example**:

   ```javascript
   const mongoose = require("mongoose");

   const userSchema = new mongoose.Schema({
     name: { type: String, required: true },
     age: { type: Number, required: true },
     email: { type: String, unique: true },
     createdAt: { type: Date, default: Date.now }
   });

   module.exports = mongoose.model("User", userSchema);
   ```

## 2. Nested Model (Embedded Documents)
   - **Description**: A model with nested objects, often used for storing related information within the same document.
   - **Example**:

   ```javascript
   const mongoose = require("mongoose");

   const userSchema = new mongoose.Schema({
     name: String,
     address: {
       street: String,
       city: String,
       postalCode: String
     }
   });

   module.exports = mongoose.model("User", userSchema);
   ```

## 3. Array of Subdocuments
   - **Description**: A model with an array of subdocuments, where each element is an embedded object.
   - **Example**:

   ```javascript
   const mongoose = require("mongoose");

   const userSchema = new mongoose.Schema({
     name: String,
     contacts: [
       {
         type: { type: String, enum: ["phone", "email"] },
         value: String
       }
     ]
   });

   module.exports = mongoose.model("User", userSchema);
   ```

## 4. Referenced Models (One-to-Many Relationship)
   - **Description**: Models referencing other documents, ideal for relationships where documents are stored separately.
   - **Example**:

   ```javascript
   const mongoose = require("mongoose");

   const postSchema = new mongoose.Schema({
     title: String,
     content: String,
     author: { type: mongoose.Schema.Types.ObjectId, ref: "User" }
   });

   module.exports = mongoose.model("Post", postSchema);
   ```

## 5. Self-Referencing Model (Recursive Relationship)
   - **Description**: A model that references other documents of the same type, useful for hierarchical structures.
   - **Example**:

   ```javascript
   const mongoose = require("mongoose");

   const categorySchema = new mongoose.Schema({
     name: String,
     parentCategory: { type: mongoose.Schema.Types.ObjectId, ref: "Category" }
   });

   module.exports = mongoose.model("Category", categorySchema);
   ```

## 6. Many-to-Many Relationship with Arrays of References
   - **Description**: A model with arrays referencing multiple documents, suitable for many-to-many relationships.
   - **Example**:

   ```javascript
   const mongoose = require("mongoose");

   const courseSchema = new mongoose.Schema({
     title: String,
     students: [{ type: mongoose.Schema.Types.ObjectId, ref: "Student" }]
   });

   module.exports = mongoose.model("Course", courseSchema);
   ```

## 7. Model with Timestamps
   - **Description**: A model that uses automatic timestamps for `createdAt` and `updatedAt` fields.
   - **Example**:

   ```javascript
   const mongoose = require("mongoose");

   const productSchema = new mongoose.Schema(
     {
       name: String,
       price: Number
     },
     { timestamps: true }
   );

   module.exports = mongoose.model("Product", productSchema);
   ```

## 8. Discriminators for Inheritance (Single Collection for Multiple Models)
   - **Description**: Allows creating different types of models that share common fields within the same collection.
   - **Example**:

   ```javascript
   const mongoose = require("mongoose");

   const baseOptions = {
     discriminatorKey: "type",
     collection: "items"
   };

   const itemSchema = new mongoose.Schema(
     {
       name: String,
       price: Number
     },
     baseOptions
   );

   const Item = mongoose.model("Item", itemSchema);

   const Book = Item.discriminator(
     "Book",
     new mongoose.Schema({ author: String })
   );

   const Furniture = Item.discriminator(
     "Furniture",
     new mongoose.Schema({ material: String })
   );

   module.exports = { Item, Book, Furniture };
   ```

## 9 . Validate

```javascript
    const mongoose = require("mongoose");

    const reservationSchema = new mongoose.Schema({
    customerName: String,
    reservationDate: { 
        type: Date, 
        required: true,
        validate: {
        validator: function(value) {
            //Date.now()
            const startDate = new Date('2024-01-01');
            const endDate = new Date('2024-12-31');
            return value >= startDate && value <= endDate;
        },
        message: "Reservation date must be between January 1, 2024 and December 31, 2024."
        }
    }
    });

    module.exports = mongoose.model("Reservation", reservationSchema);
```


---


