
// API endpoint to get all wishlist items
app.get('/wishlist', (req, res) => {
    db.all('SELECT * FROM wishlist', (err, rows) => {
      if (err) {
        res.status(500).json({ error: err.message });
        return;
      }
      res.json(rows);
    });
  });
  
  // API endpoint to add a new wishlist item
  app.post('/wishlist', (req, res) => {
    const { destination, description, country_alpha2, country_alpha3 } = req.body;
    if (!destination || !description || !country_alpha2 || !country_alpha3) {
      res.status(400).json({ error: 'Incomplete data' });
      return;
    }
  
    db.run('INSERT INTO wishlist (destination, description, country_alpha2, country_alpha3) VALUES (?, ?, ?, ?)',
      [destination, description, country_alpha2, country_alpha3], (err) => {
        if (err) {
          res.status(500).json({ error: err.message });
          return;
        }
        res.json({ message: 'Wishlist item added' });
      });
  });
  
  // API endpoint to update a wishlist item
  app.put('/wishlist/:id', (req, res) => {
    const { id } = req.params;
    const { destination, description, country_alpha2, country_alpha3 } = req.body;
  
    if (!destination || !description || !country_alpha2 || !country_alpha3) {
      res.status(400).json({ error: 'Incomplete data' });
      return;
    }
  
    db.run('UPDATE wishlist SET destination = ?, description = ?, country_alpha2 = ?, country_alpha3 = ? WHERE id = ?',
      [destination, description, country_alpha2, country_alpha3, id], (err) => {
        if (err) {
          res.status(500).json({ error: err.message });
          return;
        }
        res.json({ message: 'Wishlist item updated' });
      });
  });
  
  // API endpoint to delete a wishlist item
  app.delete('/wishlist/:id', (req, res) => {
    const { id } = req.params;
    db.run('DELETE FROM wishlist WHERE id = ?', id, (err) => {
      if (err) {
        res.status(500).json({ error: err.message });
        return;
      }
      res.json({ message: 'Wishlist item deleted' });
    });
  });
  