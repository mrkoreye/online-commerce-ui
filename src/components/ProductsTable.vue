<template>
  <table>
    <tr>
      <th>
        <input type="checkbox" />
      </th>
      <th class="name" >Name</th>
      <th>Type</th>
      <th class="right">Price</th>
      <th class="right">Inventory</th>
    </tr>
    <!-- <tr>
      <td>John</td>
      <td>Doe</td>
    </tr>
    <tr>
      <td>Jane</td>
      <td>Doe</td>
    </tr> -->
  </table>
</template>

<script>
export default {
  name: 'ProductsTable',
};
</script>

<style lang="scss" scoped>
table {
  width: 100%;
}

th {
  color: black;
  font-weight: normal;
  text-align: left;

  &.right {
    text-align: right;
  }

  &.name {
    width: 50%;
  }
}

th {
  position: relative;
  border-bottom: 1px solid #ECEDf0;
  padding: 15px 0;
  cursor: pointer;

  &::after {
    position: absolute;
    top: 24px;
    margin-left: 8px;
    content: '';
    width: 0;
    height: 0;
    border-left: 4px solid transparent;
    border-right: 4px solid transparent;
    border-top: 5px solid #A9B2BB;
  }

  &:first-child {
    text-align: center;

    &::after {
      border: 0;
    }
  }

  &:last-child {
    padding-right: 90px;
    width: 22%;
  }
}
</style>
