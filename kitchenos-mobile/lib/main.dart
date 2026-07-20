import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';

void main() {
  runApp(const ProviderScope(child: KitchenOSMobileApp()));
}

class KitchenOSMobileApp extends StatelessWidget {
  const KitchenOSMobileApp({super.key});

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'KitchenOS Mobile',
      theme: ThemeData(
        colorScheme: ColorScheme.fromSeed(seedColor: Colors.deepPurple),
        useMaterial3: true,
      ),
      home: const RoleSelectionScreen(),
    );
  }
}

class RoleSelectionScreen extends StatelessWidget {
  const RoleSelectionScreen({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: const Text('KitchenOS Workspace')),
      body: Center(
        child: Column(
          mainAxisAlignment: MainAxisAlignment.center,
          children: [
            ElevatedButton(
              onPressed: () {}, // Navigate to Owner Dashboard
              child: const Text('Owner Analytics'),
            ),
            const SizedBox(height: 16),
            ElevatedButton(
              onPressed: () {}, // Navigate to Chef KDS
              child: const Text('Chef KDS (Real-time)'),
            ),
            const SizedBox(height: 16),
            ElevatedButton(
              onPressed: () {}, // Navigate to Inventory Barcode Scanner
              child: const Text('Inventory Manager'),
            ),
          ],
        ),
      ),
    );
  }
}
