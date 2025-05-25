<p>
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456

[circleci-url]: https://circleci.com/gh/nestjs/nest

# 📒 Family Budget — Database Structure

## 📚 Entities

### Tenant (Family)

- Groups users into a family.
- Owns shared **categories**, **accounts**, **account types**, and **transactions**.

### User

- Belongs to one **Tenant**.
- Creates **transactions**.
- May have personal **accounts** (optional).

### AccountType

- Defines the type of an **account** (e.g., 'cash', 'bank', 'credit card').
- Belongs to a **Tenant** (so families can define their own types).

### Account

- Belongs to a **Tenant**.
- Belongs to an **AccountType**.
- Optionally assigned to a **User** (personal account).
- Stores **currency** (e.g., 'USD', 'PLN').

### Category

- Belongs to a **Tenant**.
- Shared across all **Users** in the **Tenant**.

### Transaction

- Belongs to a **Tenant**.
- Linked to an **Account** and a **Category**.
- Created by a **User**.

---

## 🔗 Relationships Diagram

![database.png](assets/database.png)

---

## 🛠 Key Points

- **Categories** are shared within a family (Tenant).
- **Account types** (like `cash`, `bank account`, `credit card`) are defined per family.
- **Accounts** belong to a type and can be either common or personal.
- **Transactions** store amounts in the currency of the related **Account**.
- Every **Transaction** records **who** created it.

## License

Nest is [MIT licensed](LICENSE).
