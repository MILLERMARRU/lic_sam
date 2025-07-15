'use client';

import { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { supabase } from '@/lib/supabase';
import { toast } from 'sonner';

type AddProductModalProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onProductAdded: () => void;
};

export function AddProductModal({ open, onOpenChange, onProductAdded }: AddProductModalProps) {
  const [formData, setFormData] = useState({
    cod_producto: '',
    nombre: '',
    ml: '',
    tipo: '',
    precio_minorista: '',
    precio_mayorista: '',
    precio_compra: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const { error } = await supabase.from('productos').insert([{
      cod_producto: formData.cod_producto,
      nombre: formData.nombre,
      ml: parseInt(formData.ml),
      tipo: formData.tipo,
      precio_minorista: parseFloat(formData.precio_minorista),
      precio_mayorista: parseFloat(formData.precio_mayorista),
      precio_compra: parseFloat(formData.precio_compra),
    }]);

    if (!error) {
      // Limpiar formulario y cerrar
      toast.success('Producto registrado correctamente');
      onOpenChange(false);
      setFormData({
        cod_producto: '',
        nombre: '',
        ml: '',
        tipo: '',
        precio_minorista: '',
        precio_mayorista: '',
        precio_compra: '',
      });
      onProductAdded();
    } else {
      toast.error('Error al registrar producto');
      console.error(error);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>Registrar Producto</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-4">
          <div>
            <Label htmlFor="cod_producto">Código</Label>
            <Input
              id="cod_producto"
              name="cod_producto"
              value={formData.cod_producto}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <Label htmlFor="nombre">Nombre</Label>
            <Input
              id="nombre"
              name="nombre"
              value={formData.nombre}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <Label htmlFor="ml">Volumen (ml)</Label>
            <Input
              id="ml"
              name="ml"
              type="number"
              value={formData.ml}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <Label htmlFor="tipo">Tipo</Label>
            <Input
              id="tipo"
              name="tipo"
              value={formData.tipo}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <Label htmlFor="precio_minorista">Precio Min.</Label>
            <Input
              id="precio_minorista"
              name="precio_minorista"
              type="number"
              step="0.01"
              value={formData.precio_minorista}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <Label htmlFor="precio_mayorista">Precio May.</Label>
            <Input
              id="precio_mayorista"
              name="precio_mayorista"
              type="number"
              step="0.01"
              value={formData.precio_mayorista}
              onChange={handleChange}
              required
            />
          </div>
          <div className="col-span-2">
            <Label htmlFor="precio_compra">Precio Compra</Label>
            <Input
              id="precio_compra"
              name="precio_compra"
              type="number"
              step="0.01"
              value={formData.precio_compra}
              onChange={handleChange}
              required
            />
          </div>
          <div className="col-span-2 flex justify-end">
            <Button type="submit" className="w-full">
              Registrar Producto
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
